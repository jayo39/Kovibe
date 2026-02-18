import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  List, 
  ListItem 
} from '@mui/material';
import Header from "../components/header"
import Footer from '../components/footer';
import { PageMargin } from '../styles/pages/pageMargin';

const PrivacyPage = () => {
    return (
        <>
            <Header></Header>
            <PageMargin>
                <Container maxWidth="md" sx={{ mt: 5 }}>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: '30px', 
                            borderRadius: 3, 
                            border: '1px solid #e0e0e0' 
                        }}
                    >
                        {/* 메인 헤더 */}
                        <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, mb: '24px' }}>
                            개인정보처리방침
                        </Typography>
                        <Divider sx={{ mb: 4 }} />
                        <Box sx={{ mb: 5 }}>
                            <Typography sx={{ color: '#444', lineHeight: 1.7, fontSize: '15px' }}>
                                코바이브(이하 “서비스 제공자”라 합니다)는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수하고 있습니다. 본 방침을 통해 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 5 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '18px', mb: 1.5 }}>
                                수집하는 개인정보의 항목
                            </Typography>
                            
                            <Typography sx={{ fontSize: '15px'}}>
                                서비스 제공자는 원활한 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                            </Typography>
                            <List sx={{ pl: 2 }}>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        회원가입 시 수집 항목: 학교, 사용자명(아이디), 비밀번호, 이메일 주소, 성명, 학생증 사진
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        학교 인증 시 수집 항목: 학생증 사진
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        서비스 이용 과정에서 자동 생성 및 수집되는 항목: 기기정보, 서비스 이용 기록, 접속 로그, 쿠키(Cookie), IP 주소
                                    </Typography>
                                </ListItem>
                            </List>
                        </Box>
                        <Box sx={{ mb: 5 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '18px', mb: 1.5 }}>
                                개인정보의 처리 목적
                            </Typography>
                            
                            <Typography sx={{ fontSize: '15px'}}>
                                수집한 개인정보는 다음의 목적을 위해 활용됩니다.
                            </Typography>
                            <List sx={{ pl: 2 }}>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인 식별, 불량 회원의 부정 이용 방지 및 가입 의사 확인
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        서비스 제공 및 개선: 시간표 관리, 성적 기록 등 맞춤형 서비스 제공, 신규 서비스 개발 및 특화, 이용자 맞춤형 광고 게재 및 서비스 품질 개선
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        안정적 운영: 불법 게시물 차단, 서비스 운영의 방해 행위 방지 및 행정 처리
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        민원 처리: 문의 사항 접수 및 처리, 공지사항 전달, 광고 제휴 관련 응대
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        유지보수: 서비스의 기술적 오류 수정 및 시스템 보안 유지
                                    </Typography>
                                </ListItem>
                            </List>
                        </Box>
                        <Box sx={{ mb: 5 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '18px', mb: 1.5 }}>
                                개인정보의 보유 및 이용기간
                            </Typography>
                            
                            <Typography sx={{ fontSize: '15px'}}>
                                이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기합니다. 단, 다음의 경우 명시한 기간 동안 보관합니다
                            </Typography>
                            <List sx={{ pl: 2 }}>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        회원 탈퇴 시: 이용자가 계정을 삭제할 경우, 탈퇴일로부터 14일간 보관 후 파기합니다.
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        접속 기록: 서비스 이용에 따른 로그 기록은 30일간 보관 후 파기합니다.
                                    </Typography>
                                </ListItem>
                                <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                                    <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                        학교 인증 관련: 학생증 사진 등 인증을 위해 제출된 이미지는 관리자가 승인 또는 거절 처리를 완료한 직후 즉시 파기됩니다.
                                    </Typography>
                                </ListItem>
                            </List>
                        </Box>
                        <Typography sx={{ color: '#333', fontSize: '15px' }}>
                            ※ 이용자는 본 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다. 다만, 필수 항목에 대한 동의를 거부하실 경우 코바이브 회원가입 및 서비스 이용이 제한됩니다.
                        </Typography>
                    </Paper>
                </Container>
            </PageMargin>
            <Footer/>
        </>
    )
}

export default PrivacyPage;