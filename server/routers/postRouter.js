import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/category/:id', async (req, res) => {
    const { id } = req.params;
    const page = req.query.page;
    
    try {
        if (!page) {
            // 메인 페이지
            const [posts] = await pool.query(
                `SELECT p.*, u.name as author FROM posts p 
                 JOIN users u ON p.user_id = u.id 
                 WHERE p.category_id = ? 
                 ORDER BY p.created_at DESC LIMIT 4`, 
                [id]
            );
            return res.status(200).json(posts);
        } else {
            // 게시판 페이지
            const currentPage = parseInt(page) || 1;
            const limit = 10;
            const offset = (currentPage - 1) * limit;

            const [posts] = await pool.query(
                `SELECT 
                    p.*, 
                    CASE 
                        WHEN p.isAnonymous = 1 THEN '익명' 
                        ELSE u.name 
                    END as author 
                FROM posts p 
                JOIN users u ON p.user_id = u.id 
                WHERE p.category_id = ? 
                ORDER BY p.created_at DESC LIMIT ? OFFSET ?`, 
                [parseInt(id), limit, offset]
            );

            const [countResult] = await pool.query(
                `SELECT COUNT(*) as total FROM posts WHERE category_id = ?`, 
                [id]
            );
            const total = countResult[0]?.total || 0;

            const [catResult] = await pool.query(
                `SELECT name FROM categories WHERE id = ?`, 
                [id]
            );
            const categoryName = catResult[0]?.name || "알 수 없는 게시판";

            return res.status(200).json({ posts, total, categoryName });
        }
    } catch (err) {
        console.error("BACKEND ERROR:", err);
        res.status(500).json({ msg: 'Internal Server Error', error: err.message });
    }
});

router.post('/write', async(req, res) => {
    const { title, content, userId, categoryId, isAnonymous } = req.body;
    try {
        const sql = `
            INSERT INTO posts 
            (title, content, user_id, category_id, isAnonymous, view_count, like_count, created_at) 
            VALUES (?, ?, ?, ?, ?, 0, 0, NOW())
        `;

        const [result] = await pool.query(sql, [
            title, 
            content, 
            userId, 
            categoryId, 
            isAnonymous
        ]);

        res.status(200).json({ msg: "글 쓰기 성공.", postId: result.insertId });
    } catch (err) {
        console.error("서버 오류:", err);
        res.status(500).json({ msg: "글 작성 실패. 서버 오류." });
    }
});

export default router;