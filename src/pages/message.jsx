import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Divider, List, ListItem, IconButton, CircularProgress } from '@mui/material';
import Header from "../components/header";
import Footer from '../components/footer';
import { PageMargin } from "../styles/pages/pageMargin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSyncAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';
import MessageModal from '../components/messageModal.jsx';
import { UserContext } from "../provider/userProvider";
import MessageActionModal from '../components/messageActionModal.jsx';

const MessagePage = () => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeRoomId, setActiveRoomId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isActionModalOpen, setIsActionModalOpen] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        
        const year = String(date.getFullYear()).slice(-2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    };

    const handleRoomAction = async (actionType) => {
        const currentPartnerId = conversations.find(chat => chat.id === activeRoomId)?.partner_id;

        switch(actionType) {
            case 'DELETE_ALL':
                if(window.confirm("대화방의 모든 내용을 삭제하시겠습니까?")) {
                    try {
                        await axios.delete(`/api/chat/rooms/${activeRoomId}`);
                        
                        alert("대화방이 삭제되었습니다.");
                        
                        // Reset states
                        setActiveRoomId(null);
                        setMessages([]);
                        
                        // Refresh the sidebar list
                        fetchRooms();
                    } catch (err) {
                        console.error("Deletion failed:", err);
                        alert("삭제에 실패했습니다.");
                    }
                }
                break;
            case 'BLOCK':
                console.log("Blocking partner:", currentPartnerId);
                break;
            case 'REPORT':
                console.log("Reporting room:", activeRoomId);
                break;
            default:
                break;
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await axios.get('/api/chat/rooms');
            const roomsData = response.data;
            setConversations(roomsData);

            if (roomsData.length > 0 && !activeRoomId) {
                const firstId = roomsData[0].id;
                setActiveRoomId(firstId);
                
                await axios.put(`/api/chat/rooms/${firstId}/read`);
                window.dispatchEvent(new Event("messageRead"));
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        if (!activeRoomId) return;
        try {
            const response = await axios.get(`/api/chat/rooms/${activeRoomId}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        if (!activeRoomId) return;

        const markAsRead = async () => {
            try {
                await axios.put(`/api/chat/rooms/${activeRoomId}/read`);
                window.dispatchEvent(new Event("messageRead"));
            } catch (err) {
                console.error(err);
            }
        };

        fetchMessages();
        markAsRead();
    }, [activeRoomId]);

    const activeRoom = conversations.find(chat => chat.id === activeRoomId);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="error" />
            </Box>
        );
    }

    return (
        <>
            <Header />
            <PageMargin>
                <Box sx={{ display: 'flex', gap: '15px', height: '700px', mt: 4, alignItems: 'stretch' }}>
                    
                    {/* LEFT SIDEBAR */}
                    <Box sx={{ 
                        width: { xs: '170px', md: '300px' }, border: '1px solid #eee', borderRadius: '12px', 
                        bgcolor: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' 
                    }}>
                        <Box sx={{ p: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '22px', color: '#000' }}>쪽지함</Typography>
                        </Box>
                        
                        <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                            {conversations.length > 0 ? (conversations.map((chat) => (
                                <ListItem 
                                    key={chat.id} 
                                    onClick={() => setActiveRoomId(chat.id)}
                                    sx={{ 
                                        flexDirection: 'column', alignItems: 'flex-start',
                                        bgcolor: activeRoomId === chat.id ? '#f91f15' : 'transparent',
                                        color: activeRoomId === chat.id ? '#fff' : '#000',
                                        cursor: 'pointer', borderBottom: '1px solid #f5f5f5', p: '12px 20px',
                                        '&:hover': { bgcolor: activeRoomId === chat.id ? '#e53935' : '#f9f9f9' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>{chat.name}</Typography>
                                        <Typography sx={{ fontSize: '11px', opacity: 0.7 }}>{formatDate(chat.time)}</Typography>
                                    </Box>
                                    <Typography sx={{ 
                                        fontSize: '13px', mt: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', 
                                        textOverflow: 'ellipsis', width: '100%',
                                        color: activeRoomId === chat.id ? '#fff' : '#666'
                                    }}>
                                        {chat.preview}
                                    </Typography>
                                </ListItem>
                            )) ) : (
                                <Typography sx={{ p: 3, textAlign: 'center', color: '#ccc' }}>
                                    쪽지가 없습니다.
                                </Typography>
                            )
                        }
                        </List>
                    </Box>

                    {/* RIGHT SIDEBAR */}
                    <Box sx={{ 
                        flexGrow: 1, border: '1px solid #eee', borderRadius: '12px', 
                        bgcolor: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' 
                    }}>
                        <Box sx={{ p: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: '#000', display: activeRoom ? 'block' : { xs: 'none', sm: 'block' } }}>
                                {activeRoom ? activeRoom.name : "대화를 선택해주세요"}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" disabled={!activeRoom} onClick={() => setIsModalOpen(true)}><FontAwesomeIcon icon={faPaperPlane} style={{ color: '#e53935' }}  /></IconButton>
                                <IconButton size="small"><FontAwesomeIcon icon={faSyncAlt} style={{ color: '#e53935' }} /></IconButton>
                                <IconButton size="small" disabled={!activeRoom} onClick={() => setIsActionModalOpen(true)}><FontAwesomeIcon icon={faEllipsisV} style={{ color: '#e53935' }} /></IconButton>
                            </Box>
                        </Box>

                        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: '0 20px 20px 20px' }}>
                            {messages.length > 0 ? (
                                messages.map((msg) => (
                                    <Box key={msg.id} sx={{ mt: 2.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                            <Typography sx={{ 
                                                fontSize: '13px', fontWeight: 'bold', 
                                                color: msg.type === 'received' ? '#4db6ac' : '#ffb300' 
                                            }}>
                                                {msg.type === 'received' ? '받은 쪽지' : '보낸 쪽지'}
                                            </Typography>
                                            <Typography sx={{ fontSize: '11px', color: '#bbb' }}>{formatDate(msg.time)}</Typography>
                                        </Box>
                                        <Typography sx={{ fontSize: '14px', lineHeight: 1.5, color: '#333' }}>
                                            {msg.text}
                                        </Typography>
                                        <Divider sx={{ mt: 2, borderColor: '#f5f5f5' }} />
                                    </Box>
                                ))
                            ) : (
                                <Typography sx={{ mt: 4, textAlign: 'center', color: '#ccc' }}>메시지가 없습니다.</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
                <MessageModal 
                    open={isModalOpen} 
                    onClose={() => {
                        setIsModalOpen(false);
                        fetchMessages();
                        fetchRooms();
                    }} 
                    receiverId={activeRoom?.partner_id}
                    user={user}
                    isAnonymous={activeRoom?.is_anonymous}
                />
                <MessageActionModal 
                    open={isActionModalOpen}
                    onClose={() => setIsActionModalOpen(false)}
                    onAction={handleRoomAction}
                />
            </PageMargin>
            <Footer />
        </>
    );
};

export default MessagePage;