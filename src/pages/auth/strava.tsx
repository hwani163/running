import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'

export default function auth_strava() {
  const router = useRouter();

  useEffect(()=>{
    console.log(router.query);
    const {state,code,scope,error} = router.query;
    if(error) window.close();
    if(code){
      axios.post('/api/auth',{
        platform:'strava',
        code:code,
      })
    }
  },[router.query])
  
  return (
    <div className={styles.container}>
      로그인중....
    </div>
  )
}
