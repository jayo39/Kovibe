import React, { useState, useEffect, useRef } from "react";
import { CustomRegisterPage } from "../styles/pages/register.styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, FormControl, Select, MenuItem, Typography, Box } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@mui/material/IconButton'; 

const RegisterPage1 = () => {
    const navigate = useNavigate();
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState('');
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Fetch school list
    useEffect(() => {
        const getSchools = async () => {
            try {
                const res = await axios.get('/api/school/list');
                setSchools(res.data.schoolList);
            } catch(err) {
                console.error('학교 목록 불러오기 실패.', err);
            }
        };
        getSchools();
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleNext = () => {
        if (!selectedSchool || !file) {
            alert("학교 선택과 증빙 서류 업로드는 필수입니다.");
            return;
        }
        navigate('/register2', { state: { school: selectedSchool, idFile: file } });
    };

    return (
        <CustomRegisterPage>
            <div style={{display: 'flex', justifyContent: 'center', padding: '0 20px'}}>
                <Card variant="outlined" style={{width: '780px', padding: '20px', borderRadius: '20px'}}>
                    <CardContent style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <Box>
                            <div style={{fontSize: '24px', fontWeight: '600'}}>코바이브 회원가입</div>
                            <span style={{color: '#737373', fontSize: '14px'}}>
                                코바이브 계정으로 다양한 학생 서비스를 모두 이용하실 수 있습니다.
                            </span>
                        </Box>

                        <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '-10px'}}>1. 학교 선택</div>
                        <FormControl fullWidth>
                            <Select
                                displayEmpty
                                value={selectedSchool}
                                onChange={(e) => setSelectedSchool(e.target.value)}
                                style={{
                                    borderRadius: '15px',
                                    height: '54px',
                                    border: '2px solid #eeeeee',
                                    fontSize: '14px'
                                }}
                                sx={{ '& .MuiOutlinedInput-notchedOutline': {border: 'none'} }}
                            >
                                <MenuItem disabled value="">
                                    <em style={{color: '#9ca3af'}}>학교를 선택해주세요</em>
                                </MenuItem>
                                {schools?.map((s) => (
                                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '-10px'}}>2. 학생 인증 서류 (학생증 또는 재학증명서)</div>
                        
                        {/* DRAG & DROP AREA */}
                        <div 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                width: '100%',
                                height: '200px',
                                border: isDragging ? '2px dashed #f91f15' : '2px dashed #eeeeee',
                                borderRadius: '15px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: isDragging ? '#fff5f5' : '#fafafa',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <input 
                                type="file" 
                                hidden 
                                ref={fileInputRef} 
                                onChange={handleFileChange}
                                accept="image/*,.pdf"
                            />
                            
                            {!file ? (
                                <>
                                    <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" style={{color: '#ccc', marginBottom: '10px'}} />
                                    <Typography style={{fontSize: '14px', color: '#737373'}}>
                                        파일을 이곳에 드래그하거나 클릭하여 업로드하세요
                                    </Typography>
                                    <Typography style={{fontSize: '12px', color: '#aaa', marginTop: '4px'}}>
                                        (JPG, PNG, PDF 지원)
                                    </Typography>
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FontAwesomeIcon icon={faFileAlt} size="2x" style={{color: '#f91f15'}} />
                                    <Box>
                                        <Typography style={{fontSize: '14px', fontWeight: '600'}}>{file.name}</Typography>
                                        <Typography style={{fontSize: '12px', color: '#737373'}}>{(file.size / 1024 / 1024).toFixed(2)} MB</Typography>
                                    </Box>
                                    <IconButton onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                                        <FontAwesomeIcon icon={faTimes} style={{fontSize: '16px'}} />
                                    </IconButton>
                                </Box>
                            )}
                        </div>

                        <Button 
                            onClick={handleNext}
                            style={{
                                borderRadius: '15px', 
                                backgroundColor: '#f91f15', 
                                color: '#fff', 
                                height: '54px',
                                marginTop: '10px',
                                fontWeight: 'bold'
                            }}
                        >
                            다음 단계로
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </CustomRegisterPage>
    )
}

export default RegisterPage1;