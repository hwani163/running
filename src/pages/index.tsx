import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '@styles/Home.module.css'
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session,status } = useSession();
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
