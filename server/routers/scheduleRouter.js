import express from 'express';
import pool from '../db.js';
import {loginRequired} from '../lib/utils.js'

const router = express.Router();

router.get('/', loginRequired, async (req, res) => {
    const requesterId = req.loginId;
    const targetId = req.query.userId;

    if (!targetId) return res.status(400).json({ error: "알 수 없는 아이디." });

    try {
        if (parseInt(requesterId) === parseInt(targetId)) {
            const [rows] = await pool.query('SELECT * FROM schedules WHERE user_id = ?', [targetId]);
            return res.json(rows);
        }

        const [friendship] = await pool.query(
            `SELECT 1 FROM friendships 
             WHERE status = 'accepted' 
             AND ((requester_id = ? AND addressee_id = ?) 
                  OR (requester_id = ? AND addressee_id = ?))`,
            [requesterId, targetId, targetId, requesterId]
        );

        if (friendship.length === 0) {
            return res.status(403).json({ error: "친구만 시간표를 볼 수 있습니다." });
        }

        const [rows] = await pool.query('SELECT * FROM schedules WHERE user_id = ?', [targetId]);
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/add', loginRequired, async (req, res) => {
    const { name, location, day, start_time, end_time, color } = req.body;
    const userId = req.loginId
    
    try {
        const sql = `
            INSERT INTO schedules 
            (user_id, name, location, day, start_time, end_time, color) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(sql, [userId, name, location, day, start_time, end_time, color]);
        
        res.status(200).json({ id: result.insertId, msg: "일정이 추가되었습니다." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "서버 오류로 저장하지 못했습니다." });
    }
});

router.delete('/:id', loginRequired, async (req, res) => {
    const userId = req.loginId
    try {
        await pool.query("DELETE FROM schedules WHERE id = ? AND user_id = ?", [req.params.id, userId]);
        res.status(200).json({ msg: "삭제 성공." });
    } catch (err) {
        res.status(500).json({ msg: "삭제 실패." });
    }
});

router.put('/:id', loginRequired, async (req, res) => {
    const { name, location, day, start_time, end_time, color } = req.body;
    const userId = req.loginId
    try {
        await pool.query(
            `UPDATE schedules 
             SET name=?, location=?, day=?, start_time=?, end_time=?, color=? 
             WHERE id=? AND user_id = ?`,
            [name, location, day, start_time, end_time, color, req.params.id, userId]
        );
        res.json({ msg: "수정 성공" });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;