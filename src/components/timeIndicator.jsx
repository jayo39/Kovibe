import React, { useState, useEffect } from 'react';
import { IndicatorLine } from '../styles/components/timeIndicator.styles';

const TimeIndicator = ({ startHour = 9 }) => {
    const [topPosition, setTopPosition] = useState(-100);

    useEffect(() => {
        const calculatePosition = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            if (hours >= startHour && hours < 23) {
                const decimalTime = hours + minutes / 60;
                const position = (decimalTime - startHour) * 60;
                setTopPosition(position);
            } else {
                setTopPosition(-100);
            }
        };

        calculatePosition();
        const interval = setInterval(calculatePosition, 60000);
        return () => clearInterval(interval);
    }, [startHour]);

    if (topPosition < 0) return null;

    return <IndicatorLine style={{ top: `${topPosition}px` }} />;
};

export default TimeIndicator;