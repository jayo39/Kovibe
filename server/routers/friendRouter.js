import express from 'express';
import pool from '../db.js';
import {loginRequired} from '../lib/utils.js'

const router = express.Router();


router.get('/', loginRequired, async (req, res) => {
    const userId = req.loginId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    try {
        const [rows] = await pool.query(
            `SELECT u.id, u.name, u.username, u.profile_pic, u.email 
             FROM friendships f
             JOIN users u ON (CASE 
                                WHEN f.requester_id = ? THEN f.addressee_id = u.id 
                                ELSE f.requester_id = u.id 
                              END)
             WHERE (f.requester_id = ? OR f.addressee_id = ?) 
             AND f.status = 'accepted'`,
            [userId, userId, userId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/request', loginRequired, async (req, res) => {
    const requester_id = req.loginId; 
    const { identifier } = req.body;

    try {
        const [users] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [identifier, identifier]);
        
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "존재하지 않는 사용자입니다." });
        }

        const addressee_id = users[0].id;

        if (requester_id === addressee_id) {
            return res.status(400).json({ error: "본인에게는 요청할 수 없습니다." });
        }

        const [existing] = await pool.query(
            `SELECT * FROM friendships 
             WHERE (requester_id = ? AND addressee_id = ?) 
                OR (requester_id = ? AND addressee_id = ?)`,
            [requester_id, addressee_id, addressee_id, requester_id]
        );

        if (existing.length > 0) {
            const relationship = existing[0];
            if (relationship.status === 'accepted') {
                return res.status(400).json({ error: "이미 친구 사이입니다." });
            }
            if (relationship.requester_id === requester_id) {
                return res.status(400).json({ error: "이미 요청을 보냈습니다. 상대방의 수락을 기다려주세요." });
            } else {
                return res.status(400).json({ error: "상대방이 보낸 요청이 이미 존재합니다. 알림을 확인해 주세요." });
            }
        }

        await pool.query(
            'INSERT INTO friendships (requester_id, addressee_id, status) VALUES (?, ?, ?)',
            [requester_id, addressee_id, 'pending']
        );
        
        res.status(201).json({ message: "요청을 보냈습니다." });
    } catch (err) {
        res.status(500).json({ error: "서버 오류: " + err.message });
    }
});

router.put('/respond', loginRequired, async (req, res) => {
    const userId = req.loginId;
    const { requesterId, action } = req.body;

    try {
        if (action === 'accepted') {
            await pool.query(
                'UPDATE friendships SET status = ?, updated_at = NOW() WHERE requester_id = ? AND addressee_id = ?',
                ['accepted', requesterId, userId]
            );
            return res.json({ message: "친구 요청을 수락했습니다." });
        } else if (action === 'rejected') {
            await pool.query(
                'DELETE FROM friendships WHERE requester_id = ? AND addressee_id = ?',
                [requesterId, userId]
            );
            return res.json({ message: "친구 요청을 거절 했습니다." });
        } else {
            return res.status(400).json({ error: "올바르지 않은 작업입니다." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/pending', loginRequired, async (req, res) => {
    const userId = req.loginId;
    try {
        const [rows] = await pool.query(
            `SELECT f.requester_id, u.username, u.name, u.profile_pic 
             FROM friendships f
             JOIN users u ON f.requester_id = u.id
             WHERE f.addressee_id = ? AND f.status = 'pending'`,
            [userId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:friendId', loginRequired, async (req, res) => {
    const userId = req.loginId;
    const { friendId } = req.params;

    try {
        await pool.query(
            `DELETE FROM friendships 
             WHERE (requester_id = ? AND addressee_id = ?) 
                OR (requester_id = ? AND addressee_id = ?)`,
            [userId, friendId, friendId, userId]
        );
        res.json({ message: "친구 삭제가 완료되었습니다." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;