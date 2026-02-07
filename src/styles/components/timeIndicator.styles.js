import styled from '@emotion/styled';

export const IndicatorLine = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #f91f15;
    z-index: 10;
    pointer-events: none;

    &::before {
        content: '';
        position: absolute;
        left: -3px;
        top: -3px;
        width: 8px;
        height: 8px;
        background-color: #f91f15;
        border-radius: 50%;
    }
`;