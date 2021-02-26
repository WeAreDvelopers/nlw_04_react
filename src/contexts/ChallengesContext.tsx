import { networkInterfaces } from 'os';
import { createContext, useState,ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';
interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount:number;


}
interface ChallengesContextdata{
    level:number;
    levelUp:number;
    currentExperience:number;
    challengesCompleted:()=>void;
    startNewChallnge:()=>void;
    resetChallenge:()=>void;
    completeChallenge:()=>void;
    activeChallenge:Challenge;
    experienceToNextlevel:number;
    
}

interface ChallegengesProviderProps{
    children:ReactNode
}





export const ChallengesContext = createContext({} as ChallengesContextdata);


export function ChallegengesProvider({children}:ChallegengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience,setCurrentExperience] = useState(0)
    const [challengesCompleted,setChallengesCompleted] = useState(0)

    const [activeChallenge,setActiveChallenge] = useState(null)
    const experienceToNextlevel = Math.pow((level + 1) * 4 ,2)

    useEffect(()=>{
        Notification.requestPermission();
    },[]) // primeira funcao executava 1 unica vez

    function levelUp(){
      setLevel(level + 1)
    }
    function startNewChallenge(){
        const randomChalengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChalengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
          
            new Notification('novo desafio ',{
                body:`Valendo ${challenge.amount}xp`
            })
        }

    }

    function resetChallenge(){
        setActiveChallenge(null);

    }
    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const {amount} = activeChallenge;
        let finalExeprience = currentExperience + amount;
        if(finalExeprience >= experienceToNextlevel){
            finalExeprience = finalExeprience - experienceToNextlevel;
            levelUp()
        }
        setCurrentExperience(finalExeprience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }
    return (
        <ChallengesContext.Provider value={{
            level, 
            levelUp,
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextlevel,
            completeChallenge
        }}>
        {children}
        </ChallengesContext.Provider>
    )
}