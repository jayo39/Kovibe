import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomRegisterPage } from "../styles/pages/register.styles";
import { 
    Card, CardContent, Button, Box, Typography, 
    Checkbox, FormControlLabel, Divider, Collapse 
} from "@mui/material";
import axios from 'axios';

const RegisterPage3 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const [agreements, setAgreements] = useState({
        all: false,
        tos: false,
        community: false,
        privacyRequired: false,
        marketing: false 
    });

    useEffect(() => {
        if (!data || !data.username) {
            navigate("/register1", { replace: true });
        }
    }, [data, navigate]);

    const handleCheck = (name) => (event) => {
        const checked = event.target.checked;
        
        if (name === 'all') {
            setAgreements({
                all: checked,
                tos: checked,
                community: checked,
                privacyRequired: checked,
                marketing: checked
            });
        } else {
            const newAgreements = { ...agreements, [name]: checked };
            const allChecked = 
                newAgreements.tos && 
                newAgreements.community && 
                newAgreements.privacyRequired && 
                newAgreements.marketing;
            
            setAgreements({ ...newAgreements, all: allChecked });
        }
    };

    const handleRegister = async () => {
        if (!agreements.tos || !agreements.community || !agreements.privacyRequired) {
            alert("필수 약관에 동의해야 합니다.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('pw', data.pw);
            formData.append('name', data.name);
            formData.append('school', data.school);
            formData.append('email', data.email);
            formData.append('tos', agreements.tos ? 1 : 0);
            formData.append('privacy', agreements.privacyRequired ? 1 : 0);
            formData.append('marketing', agreements.marketing ? 1 : 0);
            
            if (data.idFile) {
                formData.append('idCardFile', data.idFile);
            }

            await axios.post('/api/auth/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('회원가입이 완료되었습니다!');
            navigate('/login', { replace: true });
        } catch (err) {
            alert(err.response?.data?.msg || "오류가 발생했습니다.");
        }
    };

    // Updated TermsBox to support HTML tags like <strong>
    const TermsBox = ({ content }) => (
        <Box 
            sx={{ 
                bgcolor: '#f5f5f5', 
                p: 1.5, 
                borderRadius: '8px', 
                height: '100px', 
                overflowY: 'auto', 
                mb: 1.5, 
                fontSize: '12px', 
                color: '#666',
                userSelect: 'none',
                border: '1px solid #eee'
            }}
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
        />
    );

    return (
        <CustomRegisterPage>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: '20px' }}>
                <Card variant="outlined" sx={{ width: '780px', p: '20px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>약관 동의</Typography>

                        <FormControlLabel
                            control={<Checkbox checked={agreements.all} onChange={handleCheck('all')} color="error" />}
                            label={<Typography sx={{ fontWeight: 'bold' }}>아래 약관에 모두 동의합니다.</Typography>}
                        />
                        <Divider sx={{ my: 1 }} />

                        {/* 1. Service Terms */}
                        <FormControlLabel
                            control={<Checkbox checked={agreements.tos} onChange={handleCheck('tos')} size="small" color="error" />}
                            label={<Typography variant="body2">서비스이용약관 동의 (필수)</Typography>}
                        />
                        <Collapse in={!agreements.tos}>
                            <TermsBox content={
                                `<strong>제1조(목적)</strong>
                                본 약관은 코바이브(이하 “서비스 제공자"라 합니다)가 제공하는 서비스의 이용과 관련하여, 서비스 제공자와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 구체적으로 규정함을 목적으로 합니다.

                                <strong>제2조(정의)</strong>
                                본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                                1. "서비스"란, 서비스 제공자가 제공하는 모든 인터넷 서비스를 의미합니다.
                                2. "이용자"란, 본 약관에 동의하고 서비스 제공자가 제공하는 서비스를 이용하는 고객을 의미합니다.
                                3. "계정"이란, 이용자의 식별과 서비스 이용을 위하여 이용자가 설정하고 서비스 제공자가 승인한 체계를 의미합니다.
                                4. "게시물"이란, 이용자가 서비스를 이용함에 있어 서비스상에 게시한 글 및 각종 파일 등을 의미합니다.
                                5. "커뮤니티"란, 이용자들이 게시물을 작성하고 상호 소통할 수 있도록 서비스 내에 마련된 가상의 공간을 의미합니다.
                                6. "이용 기록"이란, 이용자가 서비스를 이용하는 과정에서 생성된 시간표, 성적, 친구 관계 등의 유무형의 데이터를 의미합니다.
                                7. "학교 인증"이란, 이용자가 해당 학교의 학생임을 확인하고 재학 여부를 검증하는 절차를 의미합니다.
                                
                                <strong>제3조(약관의 효력 및 변경)</strong>
                                • 서비스 제공자는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
                                • 약관을 개정할 경우, 서비스 제공자는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 서비스 내 [공지사항] 게시판에 적용일 7일 전부터 공지합니다.
                                • 이용자는 서비스 이용을 위해 약관 전체에 동의해야 하며, 일부 조항에 대한 선택적 동의는 허용되지 않습니다.
                                • 이용자가 개정 약관의 공지 이후에도 서비스를 계속 이용하는 경우, 약관의 변경 사항에 동의한 것으로 간주합니다.
                                • 이용자의 약관 숙지 미숙 및 부주의로 인해 발생하는 손해에 대하여 서비스 제공자는 책임을 지지 않습니다.

                                <strong>제4조(이용계약의 체결)</strong>
                                • 이용자는 가입 시 본인의 이름, 학교, 이메일 등 서비스 제공자가 요청하는 정보를 정확히 제공해야 합니다.
                                • 서비스 이용을 위해서는 반드시 이메일 인증과 학교 인증 절차를 거쳐야 합니다
                                • 학교 인증은 관리자에 의해 수동으로 검토 및 승인됩니다.
                                • 타인의 정보를 도용하거나 허위 정보를 제출할 경우, 서비스 제공자는 이용 신청을 거절할 수 있습니다.

                                <strong>제5조(이용 신청 및 승낙)</strong>
                                • 본 서비스는 대학생을 대상으로 하는 서비스로, 만 14세 이상의 이용자만 회원가입 및 이용이 가능합니다.
                                • 이용자는 가입 시 본인의 성명, 소속 대학교, 이메일 주소 등 서비스 제공자가 요청하는 정보를 사실대로 제공해야 합니다.
                                • 서비스의 신뢰성을 위해 이용자는 유효한 학생증(또는 재학 증명 서류)을 통한 학교 인증 절차를 거쳐야 하며, 인증이 완료된 사용자만이 서비스를 정상적으로 이용할 수 있습니다.
                                • 만 14세 미만의 아동은 서비스 이용이 제한되며, 타인의 정보를 도용하여 가입할 경우 발생하는 모든 법적 책임은 이용자 본인에게 있습니다.
                                
                                <strong>제6조(서비스의 중단)</strong>
                                • 서비스 제공자는 시스템 점검, 교체 및 고장 등 운영상 필요한 경우 서비스의 전부 또는 일부를 일시적으로 중단할 수 있으며, 이 경우 [공지사항]을 통해 사전 고지합니다.
                                • 본 서비스는 이용자에게 무료로 제공되는 서비스로서, 서비스 제공자는 예측하지 못한 서비스 중단이나 장애로 인해 발생한 손해에 대하여 별도의 보상 책임을 지지 않습니다.
                                
                                <strong>제7조(금지 행위)</strong>
                                1. 이용자는 다음과 같은 행위를 해서는 안됩니다.
                                • 관련 법령을 위반하는 불법 행위.
                                • 다른 이용자의 개인정보(성명, 연락처, 학교 정보 등)를 무단으로 수집, 저장 또는 외부에 노출하는 행위
                                • 프로그램, 스크립트, 봇(Bot) 등을 사용하여 정상적인 이용 범위를 벗어난 비정상적인 활동을 하는 행위
                                • 관리자를 사칭하거나, 허위 사실을 유포하여 서비스의 정상적인 운영을 방해하는 행위
                                • 운영진의 사전 승인 없이 서비스를 이용하여 상품을 판매하거나, 홍보 및 광고물을 게시하는 행위
                                • 기타 현행법에 어긋나거나 부적절하다고 판단되는 행위
                                • 이용자가 제1항에 해당하는 행위를 할 경우, 서비스 제공자는 사전 통지 없이 서비스 이용을 제한하거나 계정을 삭제하는 등 단계적인 조치를 취할 수 있습니다.
                                `
                            } />
                        </Collapse>

                        {/* 2. Community Rules */}
                        <FormControlLabel
                            control={<Checkbox checked={agreements.community} onChange={handleCheck('community')} size="small" color="error" />}
                            label={<Typography variant="body2">커뮤니티이용규칙 확인 (필수)</Typography>}
                        />
                        <Collapse in={!agreements.community}>
                            <TermsBox content={
                                `<strong>커뮤니티 이용규칙 안내</strong>
                                즐거운 커뮤니티를 위해 타인에게 불쾌감을 주는 행위, 욕설, 비하 발언 등은 제한될 수 있으며 수사기관의 요청 시 협조할 수 있습니다.
                                
                                <strong>알반 금지 행위</strong>
                                1. 국제 평화, 국제 질서 및 국가 간의 우의를 현저히 해할 우려가 있는 행위
                                2. 헌법에 위배되거나 국가의 존립을 해하는 행위
                                3. 범죄 기타 법령에 위반되는 행위
                                4. 사회통념상 일반인의 성욕을 자극하여 성적 흥분을 유발하고 정상적인 성적 수치심을 해하여 성적 도의관념에 반하는 행위
                                5. 폭력성·잔혹성·혐오성 등이 심각한 행위
                                6. 사회통합 및 사회질서를 저해하는 행위
                                7. 타인의 권리를 침해하는 행위
                                8. 자살예방법에 반하는 자살 및 자해 유발정보 유통 행위
                                9. 의료법·약사법·관세법·전파법·외국환거래법 등 법률에 반하는 거래 불가능 품목 거래 행위
                                10. 악용/오용 행위
                                11. 비정상적 시스템 이용 행위
                                
                                <strong>정치·사회 관련 금지 행위</strong>
                                1. 언론·시민단체 등 관련 단체 옹호, 추천, 반대, 비하 행위
                                2. 특정 정당·후보에 대한 지지, 비방, 투표 독려 행위
                                3. 다른 이용자를 특정 정치 단체 관련자 및 특정 이념 옹호자로 몰아가는 행위
                                4. 다양한 의견을 배척하고 여론을 하나로 수렴하는 행위
                                5. 기타 정치·사회 관련 갈등을 조장할 수 있는 행위

                                <strong>홍보 및 판매 관련 금지 행위</strong>
                                1. 커뮤니티 이용규칙이 적용되는 서비스 및 기능과 동일하거나 유사한 서비스 및 기능에 대한 직·간접적 홍보
                                2. 신용카드, 보험, 의료 광고
                                3. 성인, 도박, 베팅 사이트 홍보
                                4. 계정 판매/공유/양도
                                5. 기관·정치인·정당·종교·시민단체와 직간접적으로 연관되거나, 관련한 활동을 하는 동아리 홍보
                                6. 애플리케이션, 웹사이트, SNS, 블로그, 카페, 스토어, 서비스 홍보
                                7. 구독, 좋아요, 학우 참여, 모집, 링크 클릭, 추천인 입력, 앱 설치, 설문조사, 회원가입 요청
                                8. 계정 공유 및 판매 요청, 홍보·소개 요청, 바이럴 이벤트 등 게시물 대리 작성

                                <strong>기타</strong>
                                커뮤니티 이용규칙은 쾌적한 서비스 운영을 위해 주기적으로 업데이트됩니다.
                                서비스 제공자는 이용자가 커뮤니티 이용규칙을 숙지하지 않아 발생하는 피해에 대하여 어떠한 책임도 지지 않습니다.
                                `
                            } />
                        </Collapse>

                        {/* 3. Privacy Required */}
                        <FormControlLabel
                            control={<Checkbox checked={agreements.privacyRequired} onChange={handleCheck('privacyRequired')} size="small" color="error" />}
                            label={<Typography variant="body2">개인정보 수집 및 이용 동의 (필수)</Typography>}
                        />
                        <Collapse in={!agreements.privacyRequired}>
                            <TermsBox content={
                                `<strong>수집하는 개인정보의 항목</strong>
                                서비스 제공자는 원활한 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                                • 회원가입 시 수집 항목: 학교, 사용자명(아이디), 비밀번호, 이메일 주소, 성명, 학생증 사진
                                • 학교 인증 시 수집 항목: 학생증 사진
                                • 서비스 이용 과정에서 자동 생성 및 수집되는 항목: 기기정보, 서비스 이용 기록, 접속 로그, 쿠키(Cookie), IP 주소
                                
                                <strong>개인정보의 처리 목적</strong>
                                수집한 개인정보는 다음의 목적을 위해 활용됩니다.
                                • 회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인 식별, 불량 회원의 부정 이용 방지 및 가입 의사 확인
                                • 서비스 제공 및 개선: 시간표 관리, 성적 기록 등 맞춤형 서비스 제공, 신규 서비스 개발 및 특화, 이용자 맞춤형 광고 게재 및 서비스 품질 개선
                                • 안정적 운영: 불법 게시물 차단, 서비스 운영의 방해 행위 방지 및 행정 처리
                                • 민원 처리: 문의 사항 접수 및 처리, 공지사항 전달, 광고 제휴 관련 응대
                                • 유지보수: 서비스의 기술적 오류 수정 및 시스템 보안 유지
                                
                                <strong>개인정보의 보유 및 이용기간</strong>
                                이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기합니다. 단, 다음의 경우 명시한 기간 동안 보관합니다.
                                • 회원 탈퇴 시: 이용자가 계정을 삭제할 경우, 탈퇴일로부터 14일간 보관 후 파기합니다.
                                • 접속 기록: 서비스 이용에 따른 로그 기록은 30일간 보관 후 파기합니다.
                                • 학교 인증 관련: 학생증 사진 등 인증을 위해 제출된 이미지는 관리자가 승인 또는 거절 처리를 완료한 직후 즉시 파기됩니다.

                                ※ 이용자는 본 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다. 다만, 필수 항목에 대한 동의를 거부하실 경우 코바이브 회원가입 및 서비스 이용이 제한됩니다.
                                `
                            } />
                        </Collapse>

                        {/* 4. Marketing Optional */}
                        <FormControlLabel
                            control={<Checkbox checked={agreements.marketing} onChange={handleCheck('marketing')} size="small" color="error" />}
                            label={<Typography variant="body2">광고성 정보 수신 동의 (선택)</Typography>}
                        />
                        <Collapse in={!agreements.marketing}>
                            <TermsBox content={
                                `<strong>개인정보 수집 및 이용 동의</strong>
                                이벤트 및 혜택 정보 발송을 위해 회원식별자(푸시 토큰)를 수집 및 이용합니다. 선택 약관에 동의하지 않으셔도 서비스 이용은 가능합니다.
                                • 앱 푸시를 통해서 다양한 맞춤형 광고성 정보가 발송 됩니다.
                                • 정보주체는 광고성 정보 수신 동의를 거부하실 수 있으며, 미동의 시에도 서비스 이용은 가능합니다.
                                `
                            } />
                        </Collapse>

                        <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
                            <Button 
                                onClick={() => navigate(-1)} 
                                style={{ flex: 1, borderRadius: '15px', border: '1px solid #ddd', color: '#333', height: '54px' }}
                                disableElevation
                            >
                                이전
                            </Button>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                onClick={handleRegister}
                                disableElevation
                                sx={{ 
                                    flex: 2,
                                    height: '54px', 
                                    borderRadius: '15px', 
                                    bgcolor: '#f91f15', 
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    '&:hover': { bgcolor: '#d32f2f' } 
                                }}
                            >
                                회원가입 완료
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </CustomRegisterPage>
    );
};

export default RegisterPage3;