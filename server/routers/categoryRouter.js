import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/list', async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name FROM categories ORDER BY id ASC');

        res.status(200).json(rows);
    } catch(err) {
        res.status(500).json({msg:'게시판 카테고리 가져오기 실패.'});
    }
});

export default router;