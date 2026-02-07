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
                    END as author,
                    (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
                    (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
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
        res.status(500).json({ msg: 'Internal Server Error', error: err.message });
    }
});

router.get('/newest/sidebar', async (req, res) => {
    try {
        const [posts] = await pool.query(`
            SELECT 
                p.id, p.title, p.category_id, p.created_at,
                CASE WHEN p.isAnonymous = 1 THEN '익명' ELSE u.name END as author,
                (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
            LIMIT 3
        `);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ msg: "사이드바 데이버 불러오기 실패." });
    }
});

router.post('/write', async(req, res) => {
    const { title, content, userId, categoryId, isAnonymous } = req.body;
    try {
        const sql = `
            INSERT INTO posts 
            (title, content, user_id, category_id, isAnonymous, view_count, created_at) 
            VALUES (?, ?, ?, ?, ?, 0, NOW())
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
        res.status(500).json({ msg: "글 작성 실패. 서버 오류." });
    }
});

router.get('/:categoryId/:postId', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.query;
    try {
        const [postRows] = await pool.query(`
            SELECT p.*, c.name as categoryName,
            CASE WHEN p.isAnonymous = 1 THEN '익명(글쓴이)' ELSE u.name END as author,
            (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
            EXISTS(SELECT 1 FROM post_likes WHERE post_id = p.id AND user_id = ?) as isLiked
            FROM posts p
            JOIN users u ON p.user_id = u.id
            JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        `, [userId || null, postId]);
        
        if (postRows.length === 0) return res.status(404).json({ msg: "게시글을 찾을 수 없습니다." });

        const postAuthorId = postRows[0].user_id;

        const [commentRows] = await pool.query(`
            SELECT 
                c.*, 
                u.name as real_name,
                (SELECT COUNT(*) FROM comment_likes WHERE comment_id = c.id) as like_count,
                EXISTS(SELECT 1 FROM comment_likes WHERE comment_id = c.id AND user_id = ?) as isLiked,
                CASE 
                    WHEN c.isAnonymous = 0 THEN u.name
                    WHEN c.user_id = ? THEN '익명(글쓴이)'
                    ELSE CONCAT('익명', (
                        SELECT user_rank 
                        FROM (
                            SELECT user_id, ROW_NUMBER() OVER (ORDER BY MIN(created_at) ASC) as user_rank
                            FROM comments 
                            WHERE post_id = ? AND user_id != ? AND isAnonymous = 1
                            GROUP BY user_id
                        ) as ranks 
                        WHERE ranks.user_id = c.user_id
                    ))
                END as author
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY COALESCE(c.parent_id, c.id) ASC, c.created_at ASC
        `, [userId || null, postAuthorId, postId, postAuthorId, postId]);

        res.json({ 
            ...postRows[0], 
            isLiked: !!postRows[0].isLiked, 
            comments: commentRows 
        });
        
    } catch (err) {
        res.status(500).json({ msg: "서버 오류" });
    }
});

router.post('/:postId/like', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) return res.status(401).json({ msg: "로그인이 필요합니다." });

    try {
        const [existing] = await pool.query(
            "SELECT id FROM post_likes WHERE user_id = ? AND post_id = ?",
            [userId, postId]
        );

        if (existing.length > 0) {
            await pool.query("DELETE FROM post_likes WHERE user_id = ? AND post_id = ?", [userId, postId]);
            return res.status(200).json({ liked: false, msg: "좋아요 취소" });
        } else {
            await pool.query("INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)", [userId, postId]);
            return res.status(200).json({ liked: true, msg: "좋아요 성공" });
        }
    } catch (err) {
        res.status(500).json({ msg: "서버 오류" });
    }
});

router.put('/:postId', async (req, res) => {
    const { title, content, isAnonymous } = req.body;
    try {
        await pool.query(
            "UPDATE posts SET title = ?, content = ?, isAnonymous = ? WHERE id = ?",
            [title, content, isAnonymous, req.params.postId]
        );
        res.json({ msg: "수정 성공" });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;
    
    try {
        const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [postId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "삭제할 게시글을 찾을 수 없습니다." });
        }
        
        res.status(200).json({ msg: "게시글 삭제 성공" });
    } catch (err) {
        res.status(500).json({ msg: "서버 오류로 삭제에 실패했습니다." });
    }
});

router.post('/:postId/comment', async (req, res) => {
    const { postId } = req.params;
    const { content, userId, isAnonymous, parentId } = req.body;

    if (!content || !userId) {
        return res.status(400).json({ msg: "내용과 사용자 ID가 필요합니다." });
    }

    try {
        await pool.query(
            "INSERT INTO comments (post_id, user_id, content, isAnonymous, parent_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
            [postId, userId, content, isAnonymous, parentId || null]
        );
        res.status(200).json({ msg: "댓글 작성 성공" });
    } catch (err) {
        res.status(500).json({ msg: "서버 오류", error: err.message });
    }
});

router.delete('/comment/:commentId', async (req, res) => {
    const { commentId } = req.params;
    try {
        await pool.query("DELETE FROM comments WHERE id = ?", [commentId]);
        res.status(200).json({ msg: "댓글 삭제 성공" });
    } catch (err) {
        res.status(500).json({ msg: "서버 오류" });
    }
});

router.post('/comment/:commentId/like', async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.body;

    try {
        const [existing] = await pool.query(
            "SELECT id FROM comment_likes WHERE user_id = ? AND comment_id = ?",
            [userId, commentId]
        );

        if (existing.length > 0) {
            await pool.query("DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?", [userId, commentId]);
            res.json({ liked: false });
        } else {
            await pool.query("INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)", [userId, commentId]);
            res.json({ liked: true });
        }
    } catch (err) {
        res.status(500).json({ msg: "서버 오류" });
    }
});


export default router;