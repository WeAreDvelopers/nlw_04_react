import Head from 'next/head'
import { CompleteChalleges } from '../components/CompetedChalleges';
import { CountDown } from '../components/CountDown';
import { ChallegeBox } from '../components/ChallegeBox';

import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import styles from '../styles/pages/Home.module.css';
import { CountDownContext, CountDownProvider } from '../contexts/CountDownContext';


export default function Home() {
  return (
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
  )
}
