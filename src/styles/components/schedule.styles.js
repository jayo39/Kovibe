import styled from "@emotion/styled";
import React, { useState, useEffect } from 'react';

export const ScheduleContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    border: 1px solid #e3e3e3;
    box-shadow: none !important;
`;

export const GridHeader = styled.div`
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
    border-bottom: 1px solid #e3e3e3;
    text-align: center;
    background-color: #fcfcfc;
    
    .day-label {
        padding: 10px 0;
        font-size: 13px;
        font-weight: bold;
        color: #777;
        border-left: 1px solid #e3e3e3;
    }
`;

export const GridBody = styled.div`
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
    position: relative;
`;

export const TimeColumn = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fcfcfc;

    .time-cell {
        height: 60px;
        display: flex;
        justify-content: center;
        padding-top: 5px;
        align-items: center; 
        font-size: 11px;
        color: #999;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
    }
`;

export const DayColumn = styled.div`
    border-left: 1px solid #eee;
    position: relative;
    height: ${14 * 60}px; 
    
    background-image: linear-gradient(#eee 1px, transparent 1px);
    background-size: 100% 60px;
    background-position: 0 -1px;

`;