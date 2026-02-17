import React, { useState } from 'react';
import { 
    Dialog, 
    DialogContent, 
    TextField, 
    DialogActions, 
    Box, 
    Typography, 
    IconButton, 
    Button 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../api/axios';

const MessageModal = ({ open, onClose, receiverId, user, isAnonymous }) => {
    const [messageContent, setMessageContent] = useState("");

    const handleSendMessage = async () => {
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (!messageContent.trim()) return;

        try {
            await axios.post('/api/chat/start', {
                receiverId: receiverId,
                text: messageContent,
                isAnonymous: isAnonymous ? 1 : 0
            });

            alert("쪽지를 보냈습니다.");
            setMessageContent(""); 
            onClose();
        } catch (err) {
            console.error(err);
            alert("쪽지 발송에 실패했습니다.");
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: { 
                        borderRadius: '12px', 
                        width: '100%', 
                        maxWidth: '400px', 
                        p: 1 
                    }
                }
            }}
            disableScrollLock
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, px: 3, pb: 0 }}>
                <Typography sx={{ fontSize: '19px' }}>쪽지 보내기</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent>
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    placeholder="내용을 입력해주세요."
                    variant="outlined"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f9f9f9',
                        }
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end', pr: 3, pb: 2 }}>
                <Button 
                    onClick={handleSendMessage}
                    variant="contained" 
                    sx={{ 
                        bgcolor: '#f91f15', 
                        color: 'white', 
                        borderRadius: '20px',
                        px: 3,
                        '&:hover': { bgcolor: '#d32f2f' }
                    }}
                    disableElevation
                >
                    전송
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MessageModal;