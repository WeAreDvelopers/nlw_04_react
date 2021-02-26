import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

let countDownTimeout: NodeJS.Timeout;

interface CountdDownContextData{
    seconds:number;
    minutes:number;
    hasFinished:boolean;
    isActive:boolean;
    startCountDown: () => void;
    resetCountDown:() => void;
}

interface CountdDownProviderProps{
    children:ReactNode
}

export const CountDownContext = createContext({} as CountdDownContextData);

export function CountDownProvider({children} :  CountdDownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext)
    const [time, setTime] = useState(0.1 * 60);
    const [isActive,setisActive] = useState(false)
    const [hasFinished,setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    function startCountDown(){
        setisActive(true);
    }
    function resetCountDown(){
        clearTimeout(countDownTimeout)
        setisActive(false); // para contagem
        setTime(0.1*60) // volta relogio
        setHasFinished(false)
    }
    useEffect(
        ()=>{
           if(isActive && time > 0){ 
            countDownTimeout = setTimeout(()=>{
                   setTime(time - 1)
               },1000)
           }else if(isActive && time === 0){
            setHasFinished(true);
            setisActive(false);
            startNewChallenge()

           }
        },
        [isActive,time]
    )

    return (
        <CountDownContext.Provider value={{
            seconds,
            minutes,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,
            }} >
            {children}
        </CountDownContext.Provider>
    )
}