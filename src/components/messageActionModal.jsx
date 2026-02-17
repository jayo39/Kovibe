import React from 'react';
import { 
    Dialog, 
    Box, 
    Typography, 
    IconButton, 
    List, 
    ListItem, 
    ListItemText, 
    Divider,
    ListItemButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MessageActionModal = ({ open, onClose, onAction }) => {
    const handleActionClick = (actionType) => {
        onAction(actionType);
        onClose();
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
                        maxWidth: '300px',
                        p: 1 
                    }
                }
            }}
            disableScrollLock
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, px: 2 }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>쪽지함</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>
            
            <List sx={{ pt: 0 }}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleActionClick('DELETE_ALL')} sx={{ py: 1.5 }}>
                        <ListItemText primary="전체 삭제" sx={{ fontSize: '15px', color: '#666' }} />
                    </ListItemButton>
                </ListItem>
                <Divider sx={{ mx: 2 }} />
                
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleActionClick('BLOCK')} sx={{ py: 1.5 }}>
                        <ListItemText primary="차단" sx={{ fontSize: '15px', color: '#666' }} />
                    </ListItemButton>
                </ListItem>
                <Divider sx={{ mx: 2 }} />
                
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleActionClick('REPORT')} sx={{ py: 1.5 }}>
                        <ListItemText primary="스팸 신고" sx={{ fontSize: '15px', color: '#666' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
};

export default MessageActionModal;