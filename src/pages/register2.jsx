import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { CustomRegisterPage } from "../styles/pages/register.styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Box } from "@mui/material";
import axios from 'axios';
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const registerSchema = object({
    // School is still required in schema to ensure it was passed correctly
    school: string().required('학교 정보가 누락되었습니다. 이전 단계로 돌아가주세요.'),
    name: string().required('필수 항목입니다'),
    email: string().required('필수 항목입니다').email('올바른 이메일 형식이 아닙니다'),
    username: string().required('필수 항목입니다').max(30, '아이디는 30글자 이하여야 합니다.'),
    pw: string().required('필수 항목입니다').min('6', '비밀번호는 최소 6자 이상 입력해 주세요.').matches(/[a-zA-Z]/, '영문자를 최소 1자 이상 포함해 주세요.').matches(/[0-9]/, '숫자를 최소 1자 이상 포함해 주세요.'),
    pwCheck: string().required('필수 항목입니다').oneOf([ref('pw'), null], '비밀번호가 일치하지 않습니다.')
});

const RegisterPage2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const schoolFromStep1 = location.state?.school || '';
    const fileFromStep1 = location.state?.idFile || null;

    // 회원가입 단계1 완료 확인
    useEffect(() => {
        if (!schoolFromStep1 || !fileFromStep1) {
            navigate("/register1", { replace: true });
        }
    }, [schoolFromStep1, fileFromStep1, navigate]);

    const formik = useFormik({
        initialValues: {
            school: schoolFromStep1,
            name: '',
            email: '',
            username: '',
            pw: '',
            pwCheck: ''
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            // Instead of API call, pass ALL accumulated data to Step 3
            navigate('/register3', { 
                state: { 
                    school: values.school,
                    idFile: fileFromStep1, // From Step 1
                    name: values.name,
                    email: values.email,
                    username: values.username,
                    pw: values.pw
                } 
            });
        }
    });

    return (
        <CustomRegisterPage>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
                <Card variant="outlined" style={{ width: '780px', padding: '20px' }}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Box>
                            <div style={{fontSize: '24px', fontWeight: '600'}}>회원 정보</div>
                            <span style={{color: '#737373', fontSize: '14px'}}>
                                성명과 학교 정보가 일치하지 않는 경우, 회원가입이 제한될 수 있습니다.
                            </span>
                        </Box>
                        
                        {/* Progress Bar or Step Indicator could go here */}
                        
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onSubmit={formik.handleSubmit}>
                            
                            <input 
                                name="name" 
                                placeholder="*이름" 
                                value={formik.values.name} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.name && formik.errors.name && <div style={{ color: 'red', fontSize: '14px', fontWeight: '500' }}>*{formik.errors.name}</div>}

                            <input 
                                name="email" 
                                placeholder="*이메일" 
                                value={formik.values.email} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.email && formik.errors.email && <div style={{ color: 'red', fontSize: '14px', fontWeight: '500' }}>*{formik.errors.email}</div>}

                            <input 
                                name="username" 
                                placeholder="*아이디" 
                                value={formik.values.username} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.username && formik.errors.username && <div style={{ color: 'red', fontSize: '14px', fontWeight: '500' }}>*{formik.errors.username}</div>}

                            <input 
                                name="pw" 
                                placeholder="*비밀번호" 
                                value={formik.values.pw} 
                                type={'password'} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.pw && formik.errors.pw && <div style={{ color: 'red', fontSize: '14px', fontWeight: '500' }}>*{formik.errors.pw}</div>}

                            <input 
                                name="pwCheck" 
                                placeholder="*비밀번호 확인" 
                                value={formik.values.pwCheck} 
                                type={'password'} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.pwCheck && formik.errors.pwCheck && <div style={{ color: 'red', fontSize: '14px', fontWeight: '500' }}>*{formik.errors.pwCheck}</div>}

                            <div style={{ fontSize: '13px', color: '#9ca3af', textAlign: 'end' }}>* 필수항목</div>
                            
                            <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
                                <Button 
                                    onClick={() => navigate(-1)} 
                                    style={{ flex: 1, borderRadius: '15px', border: '1px solid #ddd', color: '#333', height: '54px' }}
                                    disableElevation
                                >
                                    이전
                                </Button>
                                <Button 
                                    type="submit" 
                                    style={{ flex: 2, borderRadius: '15px', backgroundColor: '#f91f15', color: '#fff', height: '54px' }}
                                    disableElevation
                                >
                                    다음
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </CustomRegisterPage>
    );
};

export default RegisterPage2;