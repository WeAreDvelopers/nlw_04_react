import { useState,useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';
let countDdownTimeout: NodeJS.Timeout;


export function CountDown(){
   
    const { 
        seconds,
        minutes,
        hasFinished,
        isActive,
        startCountDown,
        resetCountDown
    } = useContext(CountDownContext)

    const [minuteLeft,minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('');

    return(
        <div>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>   
                <span>{minuteRight}</span>   
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>   
                <span>{secondRight}</span>   
            </div>
        </div>
        {
            hasFinished ? (
                <button disabled
                className={styles.contDownButton }
                >
                Cliclo encerrado
                </button>
            ):(
                <>
                     {
                    isActive ? (
                        <button type="button"
                            className={`${styles.contDownButton } ${styles.contDownButtonActive }` }
                            onClick={resetCountDown}
                            >
                            Abandonar um cliclo
                            </button>
                    ):(
                        <button type="button"
                        className={styles.contDownButton}
                        onClick={startCountDown}
                        >
                        Iniciar um ciclo
                    </button>
                    )
                }
                </>
            )
        }
       
        
        </div>
    )
}