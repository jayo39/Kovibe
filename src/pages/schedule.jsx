import React, { useState } from 'react';
import Header from "../components/header";
import { PageMargin } from "../styles/pages/pageMargin";
import { Box, Typography } from '@mui/material';
import Footer from '../components/footer';
import { ScheduleContainer, GridBody, GridHeader, TimeColumn, DayColumn } from '../styles/components/schedule.styles';
import TimeIndicator from '../components/timeIndicator';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TIMES = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];



const SchedulePage = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: "데이터베이스", professor: "김교수", day: 0, start: 10.5, duration: 1.5, color: '#fff0f0' },
        { id: 2, name: "알고리즘", professor: "이교수", day: 2, start: 13, duration: 3, color: '#f0faff' },
    ]);

    const now = new Date();
    const currentDayIndex = now.getDay() - 1; // 0 for Mon, 4 for Fri

    return (
        <>
            <Header />
            <PageMargin>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>시간표</Typography>
                
                <ScheduleContainer>
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

                        {DAYS.map((_, dayIndex) => (
                            <DayColumn key={dayIndex}>
                                {dayIndex === currentDayIndex && <TimeIndicator startHour={9} />}
                                {courses.filter(c => c.day === dayIndex).map(course => (
                                    <Box
                                        key={course.id}
                                        sx={{
                                            position: 'absolute',
                                            top: (course.start - 9) * 60, // Calculate Y position
                                            height: course.duration * 60,  // Calculate Height
                                            left: '2px',
                                            right: '2px',
                                            backgroundColor: course.color,
                                            border: `1px solid rgba(0,0,0,0.05)`,
                                            borderRadius: '4px',
                                            padding: '5px',
                                            zIndex: 2,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', lineHeight: 1.2, color: '#666' }}>{course.name}</Typography>
                                        <Typography sx={{ fontSize: '11px', color: '#666' }}>{course.professor}</Typography>
                                    </Box>
                                ))}
                            </DayColumn>
                        ))}
                    </GridBody>
                </ScheduleContainer>
            </PageMargin>
            <Footer></Footer>
        </>
    );
};

export default SchedulePage;