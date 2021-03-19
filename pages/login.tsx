import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from '../styles/login.css';
import LoginCard from '../app/components/LoginCard/LoginCard'

export default function Signup() {
  const s = styles();


  return (
    <div className={s.loginContainer}>
      <LoginCard/>
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
