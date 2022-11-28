import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '@styles/Home.module.css'
import { useRouter } from 'next/router';
import { signIn, signOut, getCsrfToken, getSession } from "next-auth/react";
import { GetServerSideProps } from 'next/types';
import { useSession } from '@hooks/useSession';

export default function Home() {
  const { data: session, status, } = useSession();
  console.log(status);
  if (status === 'loading') {
    return <div>loading..</div>
  }

  if (session) return (
    <div className="flex flex-col items-start">
      {JSON.stringify(session.user)}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );

  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
