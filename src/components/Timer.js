import React, { useState, useEffect } from "react";
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: {
            main: '#ff3d00',
        },
    },
});

const ringAlarm = () => {
    const audio = new Audio('audio_file.mp3');
    audio.play();
};

const reduceTime = (time) => {
    if (time.get('minutes') === 0
        && time.get('seconds') === 0) {
        return time;
    }

    const newTime = moment.duration(time);
    newTime.subtract(1, 'seconds');
    return newTime;
};

const leftPad = (val) => {
    if (val < 10) return `0${val}`;

    return `${val}`;
};

const Timer = () => {
    const [timerStatus, setTimerStatus] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment.duration(25, 'minutes'));

    useEffect(() => {
        const id = setInterval(() => {
            if (timerStatus) {
                setCurrentTime((c) => reduceTime(c));
            }
        }, 1000);
        return () => clearInterval(id);
    }, [timerStatus]);

    return (
        <MuiThemeProvider theme={theme}>
        <div>
            <Button aria-label="Start" variant="contained" color="primary" onClick={() => setTimerStatus(true)}>Start</Button>
            <Button aria-label="Reset" variant="contained" color="primary" onClick={
                () => {
                    setCurrentTime(moment.duration(25, 'minutes'));
                    setTimerStatus(false);
                }
            }>Reset</Button>
            <h1>
                {`${leftPad(currentTime.get('minutes'))}:${leftPad(currentTime.get('seconds'))}`}
            </h1>
            <span>🍅</span>
        </div>
        </MuiThemeProvider>
    );
};

export default Timer;