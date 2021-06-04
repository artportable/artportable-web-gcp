import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from '../styles/login.css';
import LoginCard from '../app/components/LoginCard/LoginCard'
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../app/redux/actions/userActions";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useTranslation } from "next-i18next";


export default function Signup() {
  const s = styles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation(['login']);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [remember, setRemember] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  async function login() {
    try {
      const resJson = await fetch(`${apiBaseUrl}/api/user/login?email=${email}`);
      if (!resJson.ok) {
        setSnackbarOpen(true);
        return;
      }
      const res = await resJson?.json();

      if (remember) {
        localStorage.setItem('login-session', JSON.stringify(res));
      } else {
        sessionStorage.setItem('login-session', JSON.stringify(res));
      }

      dispatch({
        type: LOGIN_USER,
        payload: res.Username
      });

      router.push('/feed');
    } catch(e) {
      console.log('Could not fetch price info', e);
    }
  }

  return (
    <>
    <div className={s.loginContainer}>
      <div className={s.loginCard}>
        <LoginCard
          setEmail={setEmail}
          setPassword={setPassword}
          remember={remember}
          setRemember={setRemember}
          onClick={login}
        />
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} variant="filled" severity="error">
          {t('loginfailed')}
        </Alert>
      </Snackbar>
    </div>
    <style jsx global>{`
        body {
          background-image: url("/images/victoria-wendish-FYTn1u5OArU-unsplash.jpg");
          background-size: cover;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      isSignUp: true,
      ...await serverSideTranslations(locale, ['header', 'login', 'common']),
    }
  };
}
