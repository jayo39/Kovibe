import React, { useState, useContext } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from '@mui/icons-material/Forum';
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { CustomHeader } from "../styles/components/header.styles";
import logo from "../assets/logo.png";
import { UserContext } from "../provider/userProvider";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get current path
    const { user, setUser } = useContext(UserContext);
    const isLoggedIn = Boolean(user);
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [userAnchorEl, setUserAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userMenuOpen = Boolean(userAnchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleOpenUserMenu = (event) => setUserAnchorEl(event.currentTarget);
    const handleCloseUserMenu = () => setUserAnchorEl(null);

    const allMenus = [
        { id: 1, title: '관리자 메뉴', path: '/admin', adminOnly: true, authRequired: true},
        { id: 2, title: '게시판', path: '/', adminOnly: false, authRequired: true},
        { id: 3, title: '시간표', path: '/schedule', adminOnly: false, authRequired: true},
        { id: 4, title: '친구', path: '/friend', adminOnly: false, authRequired: true}
    ];

    const menus = allMenus.filter(menu => {
        if (menu.adminOnly) return user?.role === 'ADMIN';
        if (menu.authRequired) return isLoggedIn;
        return true;
    });

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        alert("로그아웃되었습니다.");
        handleCloseUserMenu();
        handleCloseMenu();
        navigate('/login');
    };

    return (
        <CustomHeader>
            <div className="header-container">
                <div className="left-section">
                    <Link to="/" style={{width: 'fit-content'}} className="logo-link">
                        <img src={logo} alt="Logo" style={{ height: '40px', display: 'block'}} />
                    </Link>

                    <div className="nav-links">
                        {menus.map((el) => {
                            const isActive = location.pathname === el.path;

                            return (
                                <Link key={el.id} style={{ textDecoration: 'none' }} to={el.path}>
                                    <Button 
                                        style={{ 
                                            color: isActive ? '#f91f15' : '#000',
                                            fontSize: '16px',
                                            fontWeight: isActive ? '700' : '600',
                                            borderBottom: isActive ? '3px solid #f91f15' : '3px solid transparent',
                                            borderRadius: 0,
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {el.title}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="right-section">
                    <div className="auth-links">
                        {!isLoggedIn ? (
                            <>
                                <Link to='/login'>
                                    <Button variant="contained" style={{backgroundColor: '#f91f15'}} disableElevation>로그인</Button>
                                </Link>
                                <Link to='/register'>
                                    <Button variant="outlined" disableElevation>회원가입</Button>
                                </Link>
                            </>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <IconButton style={{ padding: '8px' }}>
                                    <ForumIcon style={{ fontSize: '28px', color: '#666' }} />
                                </IconButton>

                                <IconButton onClick={handleOpenUserMenu} style={{ padding: 0 }}>
                                    <AccountCircleIcon style={{ fontSize: '40px', color: '#666' }} />
                                </IconButton>

                                <Menu
                                    anchorEl={userAnchorEl}
                                    open={userMenuOpen}
                                    onClose={handleCloseUserMenu}
                                    disableScrollLock={true}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                                        프로필
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout} style={{ color: '#f91f15' }}>
                                        로그아웃
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </div>

                    <div className="mobile-menu-icon">
                        <IconButton onClick={handleOpenMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            disableScrollLock={true}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            {menus.map((el) => (
                                <MenuItem 
                                    key={el.id} 
                                    onClick={handleCloseMenu}
                                    style={{ color: location.pathname === el.path ? '#f91f15' : 'inherit' }}
                                >
                                    <Link to={el.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        {el.title}
                                    </Link>
                                </MenuItem>
                            ))}
                            
                            <hr style={{ border: '0.5px solid #eee', margin: '8px 0' }} />

                            {!isLoggedIn ? (
                                [
                                    <MenuItem key="login" onClick={handleCloseMenu}>
                                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>로그인</Link>
                                    </MenuItem>,
                                    <MenuItem key="register" onClick={handleCloseMenu}>
                                        <Link to="/register" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>회원가입</Link>
                                    </MenuItem>
                                ]
                            ) : (
                                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                            )}
                        </Menu>
                    </div>
                </div>
            </div>
        </CustomHeader>
    );
};

export default Header;