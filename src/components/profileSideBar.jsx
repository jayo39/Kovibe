import { useContext } from "react";
import { Box, Paper, Typography, Avatar, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { ProfileSidebarContainer } from "../styles/components/profileSideBar.js";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate, Link } from "react-router-dom"; 
import { UserContext } from "../provider/userProvider";
import smallAd1 from "../assets/ads/ad1.png";
import smallAd2 from "../assets/ads/ad2.png";

const ProfileSideBar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        navigate('/login');
    };

    if (!user) {
        return (
            <ProfileSidebarContainer>
                <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                    <Typography variant="body2" color="text.secondary">로그인이 필요합니다.</Typography>
                </Paper>
            </ProfileSidebarContainer>
        );
    }

    return (
        <ProfileSidebarContainer>
            
            <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                <Avatar 
                    sx={{ width: 80, height: 80, margin: '0 auto 15px', bgcolor: '#e0e0e0' }}
                    variant="rounded"
                >
                    <PersonIcon sx={{ fontSize: 60, color: '#fff' }} />
                </Avatar>
                
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>{user.username}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{user.name}</Typography>

                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button fullWidth component={Link} to="/profile" variant="outlined" sx={{ color: '#666', borderColor: '#ddd', textTransform: 'none', fontSize: '13px' }}>
                        내 정보
                    </Button>
                    <Button onClick={handleLogout} fullWidth variant="outlined" sx={{ color: '#666', borderColor: '#ddd', textTransform: 'none', fontSize: '13px' }}>
                        로그아웃
                    </Button>
                </Box>
            </Paper>

            <Paper variant="outlined" sx={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                <List disablePadding>
                    <ListItem disablePadding onClick={() => navigate(`/post/my/posts`)}>
                        <ListItemButton sx={{ py: 1.2 }}>
                            <ListItemIcon sx={{ minWidth: 35 }}><FormatListBulletedIcon color="primary" fontSize="small" /></ListItemIcon>
                            <ListItemText sx={{ '& .MuiTypography-root': { fontSize: '14px' } }} primary="내가 쓴 글" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding onClick={() => navigate(`/post/my/comments`)}>
                        <ListItemButton sx={{ py: 1.2 }}>
                            <ListItemIcon sx={{ minWidth: 35 }}><ChatBubbleOutlineIcon sx={{ color: '#4caf50' }} fontSize="small" /></ListItemIcon>
                            <ListItemText sx={{ '& .MuiTypography-root': { fontSize: '14px' } }} primary="댓글 단 글" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton sx={{ py: 1.2 }} onClick={() => navigate(`/post/my/favorite`)}>
                            <ListItemIcon sx={{ minWidth: 35 }}><StarBorderIcon sx={{ color: '#ffc107' }} fontSize="small" /></ListItemIcon>
                            <ListItemText sx={{ textDecoration: 'none', '& .MuiTypography-root': { fontSize: '14px' } }} primary="내 스크랩" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Paper>

            <Box 
                component="img"
                src={smallAd1} 
                sx={{ 
                    width: '100%', 
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer'
                }}
            />
            <Box 
                component="img"
                src={smallAd2} 
                sx={{ 
                    width: '100%', 
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer'
                }}
            />
        </ProfileSidebarContainer>
    );
};

export default ProfileSideBar;