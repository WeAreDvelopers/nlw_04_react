import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { CompleteChalleges } from '../components/CompetedChalleges';
import { CountDown } from '../components/CountDown';
import { ChallegeBox } from '../components/ChallegeBox';

import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import styles from '../styles/pages/Home.module.css';
import { CountDownContext, CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { createContext } from 'react';

interface HomeProps{
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}



export default function Home(props) {
  //console.log(props)
  return (
    <ChallengesProvider 
    level={props.level} 
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}

    >
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar/>
      <CountDownProvider>
      <section>
        <div>
          <Profile/>
            <CompleteChalleges/>
           
          <CountDown/>
         
        </div>
        <div>
      
          <ChallegeBox/>
         
        </div>
      </section>
      </CountDownProvider>
   </div>
   </ChallengesProvider>
  )
}


export const getServerSideProps:GetServerSideProps = async (ctx) =>{

const {level, currentExperience,challengesCompleted} = ctx.req.cookies;
  return{
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted:Number(challengesCompleted)
    }
   
  }
}