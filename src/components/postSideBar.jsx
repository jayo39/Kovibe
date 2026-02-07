import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { CustomPostSideBar } from '../styles/components/postSideBar';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostSideBar = () => {

    const posts = [
        { id: 1, title: "첫 번째 게시글", author: "user1", date: "2026-02-01" },
        { id: 2, title: "맥북에서 MySQL 설정하기", author: "user2", date: "2026-02-01" },
        { id: 3, title: "123", author: "user2", date: "2026-02-01" }
    ];


    const [newestPosts, setNewestPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewest = async () => {
            try {
                const res = await axios.get('/api/post/newest/sidebar');
                setNewestPosts(res.data);
            } catch (err) {
                console.error("사이드바 데이터 불러오기 실패", err);
            }
        };
        fetchNewest();
    }, []);

    return (
        <CustomPostSideBar>
            <TableContainer component={Paper} style={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table aria-label="post table">
                    <TableHead style={{ backgroundColor: '#f8f9fa' }}>
                        <TableRow>
                            <TableCell className="table-title">실시간 인기 글</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id} hover style={{ cursor: 'pointer' }}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        
                                        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                                            {post.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#888' }}>
                                            <Typography variant="caption">{post.author}</Typography>
                                            <Typography variant="caption">{post.date}</Typography>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: 'auto' }}>
                                                <ThumbUpOffAltIcon sx={{ fontSize: '14px' }} />
                                                <Typography variant="caption">{post.likes}</Typography>
                                            </Box>
                                        </Box>

                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} style={{ marginTop: '25px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table aria-label="newest post table">
                    <TableHead style={{ backgroundColor: '#f8f9fa' }}>
                        <TableRow>
                            <TableCell className="table-title">최신 글</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newestPosts.map((post) => (
                            <TableRow 
                                key={post.id} 
                                hover 
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/post/${post.category_id}/${post.id}`)}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                                            {post.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#888' }}>
                                            <Typography variant="caption">{post.author}</Typography>
                                            <Typography variant="caption">
                                                {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                                            </Typography>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: 'auto' }}>
                                                <ThumbUpOffAltIcon 
                                                    sx={{ 
                                                        fontSize: '14px', 
                                                        color: post.like_count > 0 ? '#f91f15' : '#888' 
                                                    }} 
                                                />
                                                
                                                {post.like_count > 0 && (
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: '#f91f15',
                                                            fontWeight: 'bold' 
                                                        }}
                                                    >
                                                        {post.like_count}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomPostSideBar>
    )
}

export default PostSideBar;