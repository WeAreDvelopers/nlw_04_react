import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompleteChalleges.module.css';

export function CompleteChalleges(){

    const {challengesCompleted} = useContext(ChallengesContext)
    return (
       <div className={styles.completedChallegesContainer}>
           <span>Desafios completos</span>
           <span>{challengesCompleted}</span>
       </div>
    )
}