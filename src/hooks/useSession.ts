import { useSession as NA_useSession } from "next-auth/react";
import { useState } from "react";

export const useSession = () => {
    const sessions = NA_useSession();
    const [status, setStatus] = useState('loading');
    setTimeout(() => {
        setStatus(sessions.status)
    }, 600);
    return { data: sessions.data, status }
}