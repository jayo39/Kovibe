import express from 'express';
const router = express.Router();
import pool from '../db.js';
import {loginRequired} from '../lib/utils.js';

router.get('/rooms', loginRequired, async (req, res) => {
    const userId = req.loginId;
    try {
        const [rooms] = await pool.query(`
            SELECT 
                cr.id, 
                IF(cr.user_one_id = ?, cr.user_two_id, cr.user_one_id) AS partner_id,
                CASE 
                    WHEN cr.is_anonymous = 1 THEN '익명' 
                    ELSE u.name 
                END AS name,
                cr.last_message AS preview, 
                cr.last_message_time AS time,
                cr.is_anonymous
            FROM chat_rooms cr
            JOIN users u ON u.id = IF(cr.user_one_id = ?, cr.user_two_id, cr.user_one_id)
            WHERE cr.user_one_id = ? OR cr.user_two_id = ?
            ORDER BY cr.last_message_time DESC
        `, [userId, userId, userId, userId]);

        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});

router.get('/rooms/:roomId/messages', loginRequired, async (req, res) => {
    const { roomId } = req.params;
    const userId = req.loginId;

    try {
        const [messages] = await pool.query(`
            SELECT 
                id, 
                IF(sender_id = ?, 'sent', 'received') AS type, 
                message_text AS text, 
                created_at AS time
            FROM messages 
            WHERE chat_room_id = ?
            ORDER BY created_at ASC
        `, [userId, roomId]);

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

router.post('/messages', loginRequired, async (req, res) => {
    const { roomId, text } = req.body;
    const senderId = req.loginId;
    
    try {
        await pool.query('START TRANSACTION');

        await pool.query(
            'INSERT INTO messages (chat_room_id, sender_id, message_text) VALUES (?, ?, ?)',
            [roomId, senderId, text]
        );

        await pool.query(
            'UPDATE chat_rooms SET last_message = ?, last_message_time = NOW() WHERE id = ?',
            [text, roomId]
        );

        await pool.query('COMMIT');
        res.status(201).json({ success: true });
    } catch (err) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: "Message could not be sent" });
    }
});

router.post('/start', loginRequired, async (req, res) => {
    const { receiverId, text, isAnonymous } = req.body;
    const senderId = req.loginId;

    if (!receiverId || !text) {
        return res.status(400).json({ error: "Missing receiverId or text" });
    }

    if (senderId == receiverId) {
        return res.status(400).json({ error: "You cannot send a message to yourself." });
    }

    try {
        await pool.query('START TRANSACTION');

        const [existing] = await pool.query(
            `SELECT id FROM chat_rooms 
             WHERE (user_one_id = ? AND user_two_id = ?) 
             OR (user_one_id = ? AND user_two_id = ?)`,
            [senderId, receiverId, receiverId, senderId]
        );

        let roomId;
        if (existing.length > 0) {
            roomId = existing[0].id;
        } else {
            const [result] = await pool.query(
                'INSERT INTO chat_rooms (user_one_id, user_two_id, last_message, is_anonymous) VALUES (?, ?, ?, ?)',
                [senderId, receiverId, text, isAnonymous ? 1 : 0]
            );
            roomId = result.insertId;
        }

        await pool.query(
            'INSERT INTO messages (chat_room_id, sender_id, message_text) VALUES (?, ?, ?)',
            [roomId, senderId, text]
        );

        await pool.query(
            'UPDATE chat_rooms SET last_message = ?, last_message_time = NOW() WHERE id = ?',
            [text, roomId]
        );

        await pool.query('COMMIT');
        res.status(201).json({ success: true, roomId });
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: "Failed to send message" });
    }
});

router.get('/unread-count', loginRequired, async (req, res) => {
    const userId = req.loginId;
    try {
        const [result] = await pool.query(`
            SELECT COUNT(*) as unreadCount 
            FROM messages m
            JOIN chat_rooms cr ON m.chat_room_id = cr.id
            WHERE (cr.user_one_id = ? OR cr.user_two_id = ?)
              AND m.sender_id != ?
              AND m.is_read = 0
        `, [userId, userId, userId]);

        res.json({ count: result[0].unreadCount });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch unread count" });
    }
});

router.put('/rooms/:roomId/read', loginRequired, async (req, res) => {
    const { roomId } = req.params;
    const userId = req.loginId;
    try {
        await pool.query(
            "UPDATE messages SET is_read = 1 WHERE chat_room_id = ? AND sender_id != ?",
            [roomId, userId]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});

router.delete('/rooms/:roomId', loginRequired, async (req, res) => {
    const { roomId } = req.params;
    const userId = req.loginId;

    try {
        const [roomCheck] = await pool.query(
            'SELECT id FROM chat_rooms WHERE id = ? AND (user_one_id = ? OR user_two_id = ?)',
            [roomId, userId, userId]
        );

        if (roomCheck.length === 0) {
            return res.status(403).json({ error: "You are not authorized to delete this room." });
        }

        await pool.query('DELETE FROM chat_rooms WHERE id = ?', [roomId]);

        res.status(200).json({ success: true, message: "Room and messages deleted." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete the chat room." });
    }
});

export default router;