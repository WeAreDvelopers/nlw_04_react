import { networkInterfaces } from 'os';
import { createContext, useState,ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount:number;
}
interface ChallengesContextdata{
    level:number;
    levelUp:()=>void;
    currentExperience:number;
    challengesCompleted:()=>void;
    startNewChallnge:()=>void;
    resetChallenge:()=>void;
    completeChallenge:()=>void;
    closeLevelUpModal:()=>void;
    activeChallenge:Challenge;
    experienceToNextlevel:number;
}

interface ChallengesProviderProps{
    children:ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}




export const ChallengesContext = createContext({} as ChallengesContextdata);


export function ChallengesProvider({
    children,
   ...rest
}:ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience,setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted,setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

    const [activeChallenge,setActiveChallenge] = useState(null)

    const [isLevelUpModalOpen,setIsLevelUpModalOpen] = useState(false)
    const experienceToNextlevel = Math.pow((level + 1) * 4 ,2)

    useEffect(()=>{
       
        Notification.requestPermission();
    },[]) // primeira funcao executava 1 unica vez
    useEffect(()=>{
        Cookies.set('level',String(level))
        Cookies.set('currentExperience',String(currentExperience))
        Cookies.set('challengesCompleted',String(challengesCompleted))
    },[level,currentExperience,challengesCompleted]);
    function levelUp(){
      setLevel(level + 1);
      setIsLevelUpModalOpen(true)

    }
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
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
            completeChallenge,
            closeLevelUpModal,
        }}>
        {children}
        {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}