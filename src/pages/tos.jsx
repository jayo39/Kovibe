import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  List, 
  ListItem 
} from '@mui/material';
import Header from "../components/header";
import Footer from '../components/footer';
import { PageMargin } from '../styles/pages/pageMargin';

const TermsPage = () => {
  return (
    <>
      <Header />
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
                    서비스이용약관
                </Typography>
                
                <Divider sx={{ mb: 4 }} />

                {/* 목적 1 */}
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '18px' }}>
                        제1조(목적)
                    </Typography>
                    <Typography sx={{ color: '#444', lineHeight: 1.7, fontSize: '15px' }}>
                        본 약관은 코바이브(이하 “서비스 제공자”라 합니다)가 제공하는 서비스의 이용과 관련하여, 서비스 제공자와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 구체적으로 규정함을 목적으로 합니다.
                    </Typography>
                </Box>

                {/* 정의 */}
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '18px', mb: 1.5 }}>
                        제2조(정의)
                    </Typography>
                    
                    <Typography sx={{ fontSize: '15px'}}>
                        1. 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                    </Typography>

                    <List sx={{ pl: 2 }}>
                    {[
                        { term: '서비스', desc: '란, 서비스 제공자가 제공하는 모든 인터넷 서비스를 의미합니다.' },
                        { term: '이용자', desc: '란, 본 약관에 동의하고 서비스 제공자가 제공하는 서비스를 이용하는 고객을 의미합니다.' },
                        { term: '계정', desc: '이란, 이용자의 식별과 서비스 이용을 위하여 이용자가 설정하고 서비스 제공자가 승인한 체계를 의미합니다.' },
                        { term: '게시물', desc: '이란, 이용자가 서비스를 이용함에 있어 서비스상에 게시한 정보 형태의 글, 사진 및 각종 파일 등을 의미합니다.' },
                        { term: '커뮤니티', desc: '란, 이용자들이 게시물을 작성하고 상호 소통할 수 있도록 서비스 내에 마련된 가상의 공간을 의미합니다.' },
                        { term: '이용 기록', desc: '이란, 이용자가 서비스를 이용하는 과정에서 생성된 시간표, 성적, 친구 관계 등의 데이터를 의미합니다.' },
                        { term: '학교 인증', desc: '이란, 이용자가 해당 학교의 학생임을 확인하고 재학 여부를 검증하는 절차를 의미합니다.' }
                    ].map((item, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                "{item.term}" {item.desc}
                            </Typography>
                        </ListItem>
                    ))}
                    </List>

                    <Typography sx={{ mt: 1, fontSize: '15px' }}>
                        2. 제1항에서 정의되지 않은 이 약관 내 용어의 의미는 일반적인 이용관행에 의합니다.
                    </Typography>
                </Box>
                
                {/* 약관의 효력 및 변경 */}
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>
                        제3조(약관의 효력 및 변경)
                    </Typography>
                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                서비스 제공자는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                약관을 개정할 경우, 서비스 제공자는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 서비스 내 [공지사항] 게시판에 적용일 7일 전부터 공지합니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                이용자는 서비스 이용을 위해 약관 전체에 동의해야 하며, 일부 조항에 대한 선택적 동의는 허용되지 않습니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                이용자가 개정 약관의 공지 이후에도 서비스를 계속 이용하는 경우, 약관의 변경 사항에 동의한 것으로 간주합니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                이용자의 약관 숙지 미숙 및 부주의로 인해 발생하는 손해에 대하여 서비스 제공자는 책임을 지지 않습니다.
                            </Typography>
                        </ListItem>
                    </List>
                </Box>

                {/* 이용계약의 체결 */}
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>
                        제4조(이용계약의 체결)
                    </Typography>
                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                이용자는 가입 시 본인의 이름, 학교, 이메일 등 서비스 제공자가 요청하는 정보를 정확히 제공해야 합니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                서비스 이용을 위해서는 반드시 이메일 인증과 학교 인증 절차를 거쳐야 합니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                학교 인증은 관리자에 의해 수동으로 검토 및 승인됩니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                타인의 정보를 도용하거나 허위 정보를 제출할 경우, 서비스 제공자는 이용 신청을 거절할 수 있습니다.
                            </Typography>
                        </ListItem>
                    </List>
                </Box>

                {/* 이용 신청 및 승낙 */}
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>
                        제5조(이용 신청 및 승낙)
                    </Typography>
                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                본 서비스는 대학생을 대상으로 하는 서비스로, 만 14세 이상의 이용자만 회원가입 및 이용이 가능합니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                이용자는 가입 시 본인의 성명, 소속 대학교, 이메일 주소 등 서비스 제공자가 요청하는 정보를 사실대로 제공해야 합니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                서비스의 신뢰성을 위해 이용자는 유효한 학생증(또는 재학 증명 서류)을 통한 학교 인증 절차를 거쳐야 하며, 인증이 완료된 사용자만이 서비스를 정상적으로 이용할 수 있습니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                만 14세 미만의 아동은 서비스 이용이 제한되며, 타인의 정보를 도용하여 가입할 경우 발생하는 모든 법적 책임은 이용자 본인에게 있습니다.
                            </Typography>
                        </ListItem>
                    </List>
                </Box>

                {/* 서비스의 중단 */}
                <Box sx={{ mb: 5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>
                        제6조(서비스의 중단)
                    </Typography>
                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                서비스 제공자는 시스템 점검, 교체 및 고장 등 운영상 필요한 경우 서비스의 전부 또는 일부를 일시적으로 중단할 수 있으며, 이 경우 [공지사항]을 통해 사전 고지합니다.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                본 서비스는 이용자에게 무료로 제공되는 서비스로서, 서비스 제공자는 예측하지 못한 서비스 중단이나 장애로 인해 발생한 손해에 대하여 별도의 보상 책임을 지지 않습니다.
                            </Typography>
                        </ListItem>
                    </List>
                </Box>

                {/* 금지행위 */}
                <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '18px', mb: 1.5 }}>
                        제7조(금지행위)
                    </Typography>
                    <Typography sx={{ fontSize: '15px'}}>
                        1. 이용자는 다음과 같은 행위를 해서는 안됩니다.
                    </Typography>
                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                관련 법령을 위반하는 불법 행위.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                다른 이용자의 개인정보(성명, 연락처, 학교 정보 등)를 무단으로 수집, 저장 또는 외부에 노출하는 행위.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                프로그램, 스크립트, 봇(Bot) 등을 사용하여 정상적인 이용 범위를 벗어난 비정상적인 활동을 하는 행위.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                관리자를 사칭하거나, 허위 사실을 유포하여 서비스의 정상적인 운영을 방해하는 행위.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                운영진의 사전 승인 없이 서비스를 이용하여 상품을 판매하거나, 홍보 및 광고물을 게시하는 행위.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', listStyleType: 'disc', py: 0.3, px: 0, ml: 2 }}>
                            <Typography sx={{ color: '#333', fontSize: '15px' }}>
                                기타 현행법에 어긋나거나 부적절하다고 판단되는 행위.
                            </Typography>
                        </ListItem>
                    </List>
                    <Typography sx={{ mt: 1, fontSize: '15px' }}>
                        2. 이용자가 제1항에 해당하는 행위를 할 경우, 서비스 제공자는 사전 통지 없이 서비스 이용을 제한하거나 계정을 삭제하는 등 단계적인 조치를 취할 수 있습니다.
                    </Typography>
                </Box>
            </Paper>
        </Container>
      </PageMargin>
      <Footer/>
    </>
  );
};

export default TermsPage;