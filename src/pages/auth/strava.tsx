import axios from 'axios'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '@/styles/Home.module.css'

export default function Auth_Strava() {
  const router = useRouter();

  useEffect(() => {
    const { state, code, scope, error } = router.query;
    if (error) window.close();
    if (code) {
      axios.post('/api/auth', {
        platform: 'strava',
        code: code,
      }).then(({ data }) => {
        if (data.success) {
          window.close();
        }
      })
    }
  }, [router.query])

  return (
    <div className={styles.container}>
      로그인중....
    </div>
  )
}
