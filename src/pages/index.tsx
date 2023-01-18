import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "@styles/Home.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, getCsrfToken, getSession } from "next-auth/react";
import { GetServerSideProps, NextPageContext } from "next/types";
import { useSession } from "@hooks/useSession";
import { SideBar, Badge } from "antd-mobile";
// import { tabs } from "./tabs";

export async function getServerSideProps(context: NextPageContext) {
  
  return {
    props: { hello: "world" },
  };
}
export default function Home() {
  // 랭킹화면이 나와야한다.
  return (
    <div
      onClick={async () => {
        const a = await axios.get("/api/holy");
        // console.log(a);
      }}
    >
      홀리
    </div>
  );
}
