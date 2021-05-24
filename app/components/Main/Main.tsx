import { styles } from './main.css'
import clsx from 'clsx'

export default function Main({ children, wide = false, full = false }) {
  const s = styles();

  return (
    <div className={clsx(s.container, wide && s.wide, full && s.full)}>
      <div className={s.content}>
        {children}
      </div>
    </div>
  );
}