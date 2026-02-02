import { Link } from "react-router-dom";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import { CustomPostPage } from "../styles/pages/post.styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const PostPage = () => {
    const posts = [
        { id: 1, title: "첫 번째 게시글", author: "user1", date: "2026-02-01" },
        { id: 2, title: "맥북에서 MySQL 설정하기", author: "user2", date: "2026-02-01" },
    ];

    return (
        <>
            <Header></Header>
            <CustomPostPage>
                <div style={{display: 'flex', alignItems: 'start', flexDirection: 'column'}}>
                    <div style={{fontSize: '25px', fontWeight: 'bold'}}>텔레그노시스 게시판</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'end'}}>  
                    <SearchBar></SearchBar>
                </div>
                <TableContainer component={Paper} style={{boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                    <Table aria-label="post table">
                        <TableHead style={{ backgroundColor: '#f8f9fa' }}>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>제목</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bold' }}>작성자</TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bold' }}>날짜 <FontAwesomeIcon icon={faArrowUp} /></TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bold' }}>추천 <FontAwesomeIcon icon={faArrowUp} /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id} hover style={{ cursor: 'pointer' }}>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell align="center">{post.author}</TableCell>
                                    <TableCell align="center">{post.date}</TableCell>
                                    <TableCell align="center">
                                        <Box 
                                            sx={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            gap: 0.5
                                            }}
                                        >
                                            <ThumbUpOffAltIcon sx={{ fontSize: '20px' }} />
                                            <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                    fontFamily: '"Pretendard", sans-serif', 
                                                    fontWeight: 500,
                                                    lineHeight: 1 
                                                }}
                                                >
                                                12
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Link to="/post/create" style={{ textDecoration: 'none' }}>
                        <Button 
                            style={{ 
                                borderRadius: '150px', 
                                backgroundColor: '#edecef',
                                padding: '8px 18px',
                                fontSize: '12px',
                                color: '#6a6a6c'
                            }} 
                            variant="contained" 
                            disableElevation
                        >
                            <FontAwesomeIcon icon={faPencil} style={{marginRight: '3px'}}/>작성하기
                        </Button>
                    </Link>
                </div>
            </CustomPostPage>
        </>
        
    )
}

export default PostPage;