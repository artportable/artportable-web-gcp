import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from '../styles/login.css';
import LoginCard from '../app/components/LoginCard/LoginCard'
import { useState } from "react";
import { useRouter } from "next/router";


export default function Signup() {
  const s = styles();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [remember, setRemember] = useState(false);

  async function login() {
    try {
      const resJson = await fetch(`http://localhost:5001/api/user/login?email=${email}`);
      if (!resJson.ok) {
        return;
      }
      const res = await resJson?.json();

      if (remember) {
        localStorage.setItem('login-session', JSON.stringify(res));
      } else {
        sessionStorage.setItem('login-session', JSON.stringify(res));
      }

      router.push('/feed');
    } catch(e) {
      console.log('Could not fetch price info', e);
    }
  }

  return (
    <div className={s.loginContainer}>
      <LoginCard
        setEmail={setEmail}
        setPassword={setPassword}
        remember={remember}
        setRemember={setRemember}
        onClick={login}
      />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      ...await serverSideTranslations(locale, ['header', 'login', 'common']),
    }
  };
}
