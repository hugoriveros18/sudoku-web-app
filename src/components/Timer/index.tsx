import { useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { activeTimer,pauseTimer,updateTimer,resetTimer } from "../../features/gameData/gameData";

function Timer() {

    const countRef = useRef<null | number>(null);
    const [timerStarted,setTimerStarted] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    //GAME TIME
    const globalTime = useAppSelector((state) => {
        return state.gameData.time;
    })

    //METHODS
    const handleStart = () => {
        if(!timerStarted){
            setTimerStarted(true);
            dispatch(activeTimer(true));
            dispatch(pauseTimer(true));
            countRef.current = setInterval(() => {
                dispatch(updateTimer())
            },1000);
        }
    }
    const handlePause = () => {
        if(countRef.current != null){
            clearInterval(countRef.current)
        }
        dispatch(pauseTimer(false));
        setTimerStarted(false);
    }
    const handleReset = () => {
        if(countRef.current != null){
            clearInterval(countRef.current)
        }
        dispatch(activeTimer(false))
        dispatch(pauseTimer(false))
        setTimerStarted(false);
        dispatch(resetTimer())
    }
    const formatTime = () => {
        const getSeconds = `0${(globalTime.value % 60)}`.slice(-2);
        const minutes = Math.floor(globalTime.value / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(globalTime.value / 3600)}`.slice(-2);

        if(getHours === '00'){
            return `${getMinutes} : ${getSeconds}`
        }
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }


    return(
        <>
            <p className={`w-full text-xs text-end font-medium text-black`}>{formatTime()}</p>
            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
        </>
    )
}

export { Timer }