import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar";
import { CustomPostPage } from "../styles/pages/post.styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import PostSideBar from "../components/postSideBar";
import { PageMargin } from "../styles/pages/pageMargin";

const PostPage = () => {
    const posts = [
        { id: 1, title: "첫 번째 게시글", author: "user1", date: "2026-02-01" },
        { id: 2, title: "맥북에서 MySQL 설정하기", author: "user2", date: "2026-02-01" },
        { id: 3, title: "post1", author: "user2", date: "2026-02-01" },
        { id: 4, title: "post2", author: "user2", date: "2026-02-01" },
        { id: 5, title: "post3", author: "user2", date: "2026-02-01" },
        { id: 6, title: "post4", author: "user2", date: "2026-02-01" },
        { id: 7, title: "post5", author: "user2", date: "2026-02-01" },
        { id: 8, title: "post5", author: "user2", date: "2026-02-01" },
        { id: 9, title: "post5", author: "user2", date: "2026-02-01" },
        { id: 10, title: "post5", author: "user2", date: "2026-02-01" },
    ];

    return (
        <PageMargin>
            <div style={{display: 'flex', width: '100%', gap: '30px', alignItems: 'flex-start'}}>
                <CustomPostPage>
                    <div style={{display: 'flex', alignItems: 'start', flexDirection: 'column'}}>
                        <div style={{fontSize: '25px', fontWeight: 'bold'}}>자유게시판</div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'end'}}>  
                        <SearchBar></SearchBar>
                    </div>
                    <TableContainer component={Paper} style={{boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                        <Table aria-label="post table">
                            <TableHead style={{ backgroundColor: '#f8f9fa' }}>
                                <TableRow>
                                    <TableCell className="table-title">제목</TableCell>
                                    <TableCell className="table-title" align="center" >작성자</TableCell>
                                    <TableCell className="table-title" align="center">날짜 <FontAwesomeIcon icon={faArrowUp} /></TableCell>
                                    <TableCell className="table-title" align="center">추천 <FontAwesomeIcon icon={faArrowUp} /></TableCell>
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
                                    backgroundColor: '#f91f15',
                                    padding: '8px 18px',
                                    fontSize: '12px',
                                    color: '#fff'
                                }} 
                                variant="contained" 
                                disableElevation
                            >
                                <FontAwesomeIcon icon={faPencil} style={{marginRight: '3px'}}/>작성하기
                            </Button>
                        </Link>
                    </div>
                </CustomPostPage>
                <PostSideBar></PostSideBar>
            </div>
        </PageMargin>
    )
}

export default PostPage;