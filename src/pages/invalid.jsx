import React from 'react';
import Header from "../components/header";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Footer from '../components/footer';
import { PageMargin } from "../styles/pages/pageMargin";

const InvalidPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <PageMargin>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        minHeight: '60vh', // 헤더/푸터 사이 중앙 배치
                        textAlign: 'center',
                        gap: 2
                    }}
                >
                    {/* 에러 아이콘 */}
                    <ErrorOutlineIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />

                    {/* 에러 메시지 */}
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                        요청하신 페이지는 없는 페이지 입니다.
                    </Typography>

                    <Typography variant="body1" sx={{ color: '#888', mb: 3 }}>
                        입력하신 주소가 정확한지 다시 한번 확인해 주세요.<br />
                        친구가 아닌 사용자의 정보는 접근이 제한될 수 있습니다.
                    </Typography>

                    {/* 이전으로 이동 버튼 */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button 
                            variant="outlined" 
                            onClick={() => navigate(-1)}
                            sx={{ borderColor: '#ddd', color: '#666' }}
                        >
                            이전 페이지로
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate('/')}
                            sx={{ backgroundColor: '#f91f15', '&:hover': { backgroundColor: '#d11912' } }}
                            disableElevation
                        >
                            홈으로 이동
                        </Button>
                    </Box>
                </Box>
            </PageMargin>
            <Footer />
        </>
    );
};

export default InvalidPage;