import styled from '@emotion/styled';

export const IndicatorLine = styled.div`
    position: absolute;
    left: 60px; /* Offset for TimeColumn */
    right: 0;
    height: 2px;
    z-index: 10;
    pointer-events: none;

    background-image: linear-gradient(to right, #f91f15 50%, transparent 50%);
    background-size: 6px 2px; /* 3px red, 3px gap */
    background-repeat: repeat-x;

    &::after {
        content: '';
        position: absolute;
        height: 100%;
        background-color: #f91f15;
        width: calc(100% / 7);
        left: ${props => (props.currentDay * (100 / 7))}% ;
        top: 0;
    }

    &::before {
        content: '';
        position: absolute;
        left: ${props => (props.currentDay * (100 / 7))}% ;
        top: -3px;
        width: 8px;
        height: 8px;
        background-color: #f91f15;
        border-radius: 50%;
        z-index: 11;
        transform: translateX(-50%);
    }
`;