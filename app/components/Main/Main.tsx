import { styles } from './main.css'
import clsx from 'clsx'
import { MainGridItem } from './MainGridItem/MainGridItem';

export default function Main({ children, wide = false, noHeaderPadding = false }) {
  const s = styles();

  return (
    <div className={clsx(s.container, wide && s.wide, noHeaderPadding && s.noHeaderPadding)}>
      {children}
    </div>
  );
}

export const GridRow = MainGridItem;