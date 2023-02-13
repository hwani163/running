import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@styles/Home.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, getCsrfToken, getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { useSession } from "@hooks/useSession";

export default function Home() {
  const [distance, setDistance] = useState(0);
  const [distanceType, setDistanceType] = useState("km");
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const allSec = hour * 3600 + min * 60 + sec;

  // useEffect(() => {}, [distance, allSec]);
  console.log(allSec / (distance / 1000));
  const aa = `${allSec / (distance / 1000)}`;
  const face = (aa) => {
    //@ts-ignore
    return (aa - (aa %= 60)) / 60 + (9 < aa ? ":" : ":0") + aa;
  };
  console.log(face(aa));
  const facemin = Math.floor(aa / 60) || 0;
  const facesec = aa - facemin * 60 || 0;
  const m_s = distance / allSec || 0;
  const onChangeDistance = (distanceType: string, value: number) => {
    switch (distanceType) {
      case "km":
        setDistance(Number(value) * 1000);
        break;
      case "m":
        setDistance(Number(value));
        break;
      case "mile":
        setDistance(Number(value) * 1609.34);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(distanceType);
    onChangeDistance(distanceType, distance);
  }, [distanceType]);

  return (
    <div>
      <div>
        <input
          type="number"
          onChange={(e) =>
            onChangeDistance(distanceType, Number(e.target.value))
          }
        />
        <select
          value={distanceType}
          onChange={(e) => {
            setDistanceType(String(e.target.value));
          }}
        >
          <option value="km">km</option>
          <option value="m">m</option>
          <option value="mile">mile</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          onChange={(e) => {
            setHour(Number(e.target.value));
          }}
        />
        시간
        <input
          type="number"
          onChange={(e) => {
            setMin(Number(e.target.value));
          }}
        />
        분
        <input
          type="number"
          onChange={(e) => {
            setSec(Number(e.target.value));
          }}
        />
        초
      </div>
      <div>
        <input type="number" value={facemin} />
        :
        <input type="number" value={facesec} />
        /km
      </div>
      <div>
        <input
          type="number"
          onChange={(e) => setDistance(Number(e.target.value))}
        />
        km/h
      </div>
      <div>
        <input
          type="number"
          value={m_s}
          onChange={(e) => setDistance(Number(e.target.value))}
        />
        m/s
      </div>
    </div>
  );
}
