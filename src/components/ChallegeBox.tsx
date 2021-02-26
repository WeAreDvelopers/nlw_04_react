import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallegeBox.module.css';

export function ChallegeBox(){
    
    
    const {activeChallenge,resetChallenge,completeChallenge} = useContext(ChallengesContext);
    const {resetCountDown} = useContext(CountDownContext);
    
    function handleChallengeSucceed(){
        completeChallenge();
        resetCountDown()
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountDown();
    }

    return (
        <div className={styles.challegeBoxContainer}>
           {
               activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>
                        Ganher {activeChallenge.amount} xp
                    </header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}
                        >Falhei
                        </button>
                        <button 
                        type="button"
                        className={styles.challengeSucceedButton}
                        onClick={handleChallengeSucceed}
                        >Completei
                        </button>
                    </footer>
                </div>
               ) :(
                <div className={styles.challegeNotActive}>
                    <strong>Finalize um cliclo para receber um desafio</strong>
                    <p><img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level complentando desafios
                    </p>

                </div>
               )
           }
        </div>
    )
}