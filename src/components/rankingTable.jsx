import { Link } from "react-router-dom";
import { CustomRankingTable } from "../styles/components/rankingTable.styles";
import React, { useState, useEffect } from 'react';

const RankingTable = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    };

    const rankings = [
        { id: 1, text: "제목 1 입니다", status: "NEW" },
        { id: 2, text: "제목 2 입니다", status: "NEW" },
        { id: 3, text: "제목 3 입니다", status: "DOWN" },
        { id: 4, text: "제목 4 입니다", status: "DOWN" },
        { id: 5, text: "제목 5 입니다", status: "DOWN" }, // Scroll starts after this
        { id: 6, text: "제목 6 입니다", status: "NEW" },
        { id: 7, text: "제목 7 입니다", status: "NEW" },
        { id: 8, text: "제목 8 입니다", status: "NEW" },
        { id: 9, text: "제목 9 입니다", status: "NEW" },
        { id: 10, text: "제목 10 입니다", status: "NEW" },
    ];

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <CustomRankingTable>
                <div className="header">
                    <div className="header-title">
                        <div>
                            <h2>실시간 인기 글</h2>
                        </div>
                        <div>{formatDateTime(currentTime)} 기준</div>
                    </div>
                </div>
                
                <div className="list-wrapper">
                    {rankings.map((item) => (
                        <div className="row" key={item.id} style={{ opacity: item.isFaded ? 0.3 : 1 }}>
                            <div className="rank">{item.id}</div>
                            <div className="content">{item.text}</div>
                            <div className="status">
                                {item.status === "NEW" ? "NEW" : "▼"}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="fade-overlay" />

                <Link to="/post" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="footer-button">
                        실시간 인기 글 자세히보기
                    </div>
                </Link>
            </CustomRankingTable>
        </div>
    );
}

export default RankingTable;