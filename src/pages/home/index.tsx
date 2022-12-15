import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "@styles/Home.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, getCsrfToken, getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { useSession } from "@hooks/useSession";
import { SideBar, Badge } from "antd-mobile";
import { tabs } from "./tabs";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(status);
  if (status === "loading") {
    return <div>loading..</div>;
  }

  // 랭킹화면이 나와야한다.
  return (
    <div>
      <div>1위</div>
      <div>하사</div>
      <div>원석환</div>
      <div>100km</div>
      <div>200km(목표거리)</div>
      <div>50%(달성률)</div>
    </div>
  );
}
