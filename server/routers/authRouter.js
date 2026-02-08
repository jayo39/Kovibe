import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {loginRequired} from '../lib/utils.js';

const router = express.Router();

// 회원가입
router.post('/register', async(req, res) => {
    try {
        // 중복 아이디 확인
        let sql = `SELECT username FROM users WHERE username = ?`;
        let [usernames] = await pool.query(sql, [req.body.username]);
        if(usernames.length > 0) {
            res.status(400).json({errno: 1, msg: '이미 존재하는 아이디입니다.'});
            return;
        }

        // 중복 이메일 확인
        sql = `SELECT email FROM users WHERE email = ?`;
        let [emails] = await pool.query(sql, [req.body.email]);
        if(emails.length > 0) {
            res.status(400).json({errno: 2, msg: '이미 사용 중인 이메일입니다.'});
            return;
        }

        // 비밀번호 암호화
        const encryptPw = bcrypt.hashSync(req.body.pw, 10);

        sql = `INSERT INTO users (username, password, name, role, email, school_id) VALUES (?, ?, ?, 'MEMBER', ?, ?)`;

        await pool.query(sql, [req.body.username, encryptPw, req.body.name, req.body.email, req.body.school])

        res.status(200).json({msg: '회원가입이 완료되었습니다.'});
    } catch(err) {
        console.log(err);
        res.status(500).json({errno: 3, msg: '회원가입에 실패했습니다. 다시 시도해 주세요.'});
    }
});

// 로그인
router.post('/login', async(req, res) => {
    try {
        let sql = `SELECT * FROM users WHERE username = ?`;
        let [rows] = await pool.query(sql, [req.body.username]);

        // 존재하지 않는 회원
        if(rows.length === 0) {
            res.status(400).json({errno: 1, msg: '입력한 아이디 또는 비밀번호가 일치하지 않습니다.'});
            return;
        }

        // 비밀번호가 일치하지 않음
        if(!bcrypt.compareSync(req.body.pw, rows[0].password)) {
            res.status(400).json({errno: 1, msg: '입력한 아이디 또는 비밀번호가 일치하지 않습니다.'});
            return;
        }

        // 로그인 성공
        let token = jwt.sign({username: rows[0].username, id: rows[0].id, role: rows[0].role}, 'TLtoken', {expiresIn: '1h'});
        res.status(200).json({msg: '로그인되었습니다.', accessToken: token, role: rows[0].role, user: rows[0]});
    } catch(err) {
        res.status(500).json({errno: 2, msg: '로그인에 실패했습니다. 다시 시도해 주세요.'});
    }
});

// 로그인 확인
router.get('/loggedIn', loginRequired, async(req, res) => {
    try {
        let sql = `SELECT id, username, name, role, email, school_id FROM users WHERE id = ?`;
        let [rows] = await pool.query(sql, [req.loginId]);
        res.json(rows[0]);
    } catch(err) {
        res.status(500).json({errno: 3, msg: '서버 오류가 발생했습니다.'});
    }
});

router.get('/user/:id', loginRequired, async (req, res) => {
    const requesterId = req.loginId; // 로그인한 본인 ID
    const targetId = req.params.id;  // 확인하려는 상대방 ID

    try {
        // 1. 본인이 본인 정보를 확인하는게 아니라면 친구인지 먼저 검사
        if (parseInt(requesterId) !== parseInt(targetId)) {
            const [friendship] = await pool.query(
                `SELECT 1 FROM friendships 
                 WHERE status = 'accepted' 
                 AND ((requester_id = ? AND addressee_id = ?) 
                      OR (requester_id = ? AND addressee_id = ?))`,
                [requesterId, targetId, targetId, requesterId]
            );

            // 친구가 아니라면 403 에러 반환 (보안을 위해 메시지 통일)
            if (friendship.length === 0) {
                return res.status(403).json({ error: "요청하신 페이지는 없는 페이지 입니다." });
            }
        }

        // 2. 친구 관계가 확인되었거나 본인인 경우에만 정보 조회
        const [rows] = await pool.query(
            'SELECT name, username FROM users WHERE id = ?', 
            [targetId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
    }
});

export default router;