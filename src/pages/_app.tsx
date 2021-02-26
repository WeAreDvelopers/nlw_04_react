
import '../styles/global.css';
import {ChallegengesProvider, ChallengesContext} from '../contexts/ChallengesContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
 
  return (
      <ChallegengesProvider>
       
          <Component {...pageProps} />
        
      </ChallegengesProvider>
   
  )
}

export default MyApp
