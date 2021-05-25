import { styles } from './mainGridItem.css'
import clsx from 'clsx'
import { FunctionComponent } from 'react';

type Props = {
  fullWidth?: boolean;
}

export const MainGridItem: FunctionComponent<Props> = ({ fullWidth, children }) => {
  const s = styles();

  return (
    <div className={clsx(fullWidth && s.fullWidth, !fullWidth && s.center)}>
      {children}
    </div>
  ); 
}