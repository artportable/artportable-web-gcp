import { styles } from './main.css'

export default function Main({ children }) {
  const s = styles();

  return (
    <div className={s.container}>
      <div className={s.content}>
        {children}
      </div>
    </div>
  );
}