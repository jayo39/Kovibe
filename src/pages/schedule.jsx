import React, { useState, useEffect, useContext, useRef } from 'react';
import Header from "../components/header";
import { PageMargin } from "../styles/pages/pageMargin";
import { Box, Typography } from '@mui/material';
import Footer from '../components/footer';
import { ScheduleContainer, GridBody, GridHeader, TimeColumn, DayColumn } from '../styles/components/schedule.styles';
import ScheduleActionsBox from '../components/scheduleActionsBox';
import TimeIndicator from '../components/timeIndicator';
import AddCourseModal from '../components/addCourseModal';
import { UserContext } from "../provider/userProvider";
import axios from '../api/axios';
import { useParams, useNavigate } from "react-router-dom";

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TIMES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];



const SchedulePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState({ day: 0, time: 9 });
    const [editingCourse, setEditingCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const { user, loading: authLoading } = useContext(UserContext);
    const { userId } = useParams();
    const navigate = useNavigate();

    const gridRef = useRef(null);

    const [targetName, setTargetName] = useState("");
    const targetId = userId || user?.id;
    const isMySchedule = !userId || Number(userId) === Number(user?.id);

    const fetchSchedules = async (id) => {
        if (!id) return;
        if (!user) return;
        try {
            const res = await axios.get(`/api/schedule?userId=${id}`);
            
            const formattedData = res.data.map(item => ({
                id: item.id,
                name: item.name,
                location: item.location,
                day: item.day,
                start: parseFloat(item.start_time),
                duration: parseFloat(item.end_time) - parseFloat(item.start_time),
                color: item.color || '#f0faff',
                modifiedAt: item.modified_at
            }));
            
            setCourses(formattedData);
        } catch (err) {
            if (err.response?.status === 403 || err.response?.status === 404) {
                console.error("데이터 가져오기 실패", err);
            } else {
                console.error("스케줄 가져오기 실패", err);
            }
        }
    };

    useEffect(() => {
        if (authLoading) return;

        if (targetId) {
            fetchSchedules(targetId);
        }

        const fetchTargetUserInfo = async () => {
            if (isMySchedule) {

                setTargetName(user?.name || "내");
                return;
            }

            try {
                const res = await axios.get(`/api/auth/user/${userId}`);
                setTargetName(res.data.name);
            } catch (err) {
                if (err.response?.status === 403 || err.response?.status === 404) {
                    navigate('/404');
                }
            }
        };

        fetchTargetUserInfo();
        
    }, [userId, user?.id, authLoading, isMySchedule, navigate]);

    const handleColumnClick = (e, dayIndex) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const clickedTime = 8 + (y / 60);
        const snappedTime = Math.floor(clickedTime); 

        setEditingCourse(null);
        setSelectedSlot({ day: dayIndex, time: snappedTime });
        setIsModalOpen(true);
    };

    const handleCourseClick = (e, course) => {
        e.stopPropagation();
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleDeleteCourse = async (e, courseId) => {
        e.stopPropagation();
        if (window.confirm("이 수업을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/api/schedule/${courseId}`);
                setCourses(courses.filter(course => course.id !== courseId));
            } catch (err) {
                alert("삭제에 실패했습니다.");
            }
        }
    };

    const handleSaveCourse = (newCourse) => {
        const formatted = {
            ...newCourse,
            modifiedAt: newCourse.modified_at || new Date().toISOString(),
            start: newCourse.start_time,
            duration: newCourse.end_time - newCourse.start_time
        };

        if (editingCourse) {
            setCourses(prev => prev.map(c => c.id === formatted.id ? formatted : c));
        } else {
            setCourses(prev => [...prev, formatted]);
        }
    };

    return (
        <>
            <Header />
            <PageMargin>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: '40px', 
                        alignItems: 'flex-start',
                        width: '100%'
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            gap: { xs: '10px', sm: '40px' }, 
                            alignItems: 'flex-start',
                            width: '100%',
                            maxWidth: '1100px', 
                            mx: 'auto'
                        }}>
                            <Box sx={{ 
                                flexShrink: 0,
                                display: { xs: 'none', sm: 'block' } 
                            }}>
                                <ScheduleActionsBox 
                                    gridRef={gridRef} 
                                    scheduleTitle={isMySchedule ? "내 시간표" : `${targetName}님의 시간표`} 
                                    courses={courses}
                                    isMySchedule={isMySchedule} 
                                />
                            </Box>

                            <Box sx={{ position: 'relative', minWidth: 0, width: '800px'}}>
                                <ScheduleContainer ref={gridRef}>
                                    <GridHeader>
                                        <div style={{ width: '60px' }}></div>
                                        {DAYS.map(day => <div key={day} className="day-label">{day}</div>)}
                                    </GridHeader>

                                    <GridBody>
                                        <TimeColumn>
                                            {TIMES.map(time => (
                                                <div key={time} className="time-cell">{time} 시</div>
                                            ))}
                                        </TimeColumn>
                                        <TimeIndicator startHour={8} />

                                        {DAYS.map((_, dayIndex) => (
                                            <DayColumn key={dayIndex} style={{ cursor: isMySchedule ? 'pointer' : 'default' }} onClick={(e) => isMySchedule && handleColumnClick(e, dayIndex)}>
                                                {courses.filter(c => c.day === dayIndex).map(course => (
                                                    <Box
                                                        key={course.id}
                                                        onClick={(e) => handleCourseClick(e, course)}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: (course.start - 8) * 60,
                                                            height: course.duration * 60,
                                                            left: '2px',
                                                            right: '2px',
                                                            backgroundColor: course.color,
                                                            border: `1px solid rgba(0,0,0,0.05)`,
                                                            borderRadius: '4px',
                                                            padding: '5px',
                                                            zIndex: 2,
                                                            overflow: 'hidden',
                                                            cursor: isMySchedule ? 'pointer' : 'default',
                                                            transition: 'all 0.2s',
                                                            '&:hover': {
                                                                filter: isMySchedule ? 'brightness(0.95)' : 'none',
                                                            }
                                                        }}
                                                    >
                                                        {isMySchedule && (
                                                            <button 
                                                                className="delete-btn"
                                                                onClick={(e) => handleDeleteCourse(e, course.id)}
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '4px',
                                                                    right: '4px',
                                                                    border: 'none',
                                                                    background: 'rgba(0,0,0,0.15)',
                                                                    borderRadius: '50%',
                                                                    cursor: 'pointer',
                                                                    fontSize: '10px',
                                                                    width: '18px',
                                                                    height: '18px',
                                                                    lineHeight: '18px',
                                                                    textAlign: 'center',
                                                                    padding: 0,
                                                                    color: '#333',
                                                                    zIndex: 10
                                                                }}
                                                            >
                                                                ✕
                                                            </button>
                                                        )}

                                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', lineHeight: 1.2, color: '#444' }}>
                                                            {course.name}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: '10px', color: '#888', mt: 0.5 }}>
                                                            {course.location}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </DayColumn>
                                        ))}
                                    </GridBody>
                                </ScheduleContainer>
                            </Box>

                        </Box>
                        
                    </Box>
                    {isMySchedule && (
                        <AddCourseModal 
                            open={isModalOpen} 
                            onClose={() => setIsModalOpen(false)} 
                            initialData={editingCourse || selectedSlot}
                            isEditMode={!!editingCourse}
                            onSave={handleSaveCourse}
                            userId={user?.id}
                        />
                    )}

                </div>
            </PageMargin>
            <Footer />
        </>
    );
};

export default SchedulePage;