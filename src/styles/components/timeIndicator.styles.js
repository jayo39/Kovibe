import styled from '@emotion/styled';

export const IndicatorLine = styled.div`
    position: absolute;
    left: 60px; /* Offset for TimeColumn */
    right: 0;
    height: 2px;
    z-index: 10;
    pointer-events: none;

    /* 1. The Base Dashed Line (Repeating across all days) */
    background-image: linear-gradient(to right, #f91f15 50%, transparent 50%);
    background-size: 6px 2px; /* 3px red, 3px gap */
    background-repeat: repeat-x;

    /* 2. The Solid Part (The part over "today") */
    &::after {
        content: '';
        position: absolute;
        height: 100%;
        background-color: #f91f15;
        /* Calculate width and position based on 7 days */
        width: calc(100% / 7);
        left: ${props => (props.currentDay * (100 / 7))}% ;
        top: 0;
    }

    /* 3. The Red Circle */
    &::before {
        content: '';
        position: absolute;
        /* Position the circle at the start of the today's column */
        left: ${props => (props.currentDay * (100 / 7))}% ;
        top: -3px;
        width: 8px;
        height: 8px;
        background-color: #f91f15;
        border-radius: 50%;
        z-index: 11;
        transform: translateX(-50%); /* Center the circle on the line start */
    }
`;