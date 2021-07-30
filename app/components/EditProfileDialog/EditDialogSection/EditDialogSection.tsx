import { Typography } from '@material-ui/core'
import { styles } from './editDialogSection.css';

export const EditDialogSection = ({ title, children }) => {
  const s = styles();

  return (
    <>
      <div className={s.headerContainer}>
        <Typography variant="subtitle2" component="h4">
          {title}
        </Typography>
      </div>

      
      <div className={s.fieldsContainer}>
        {children}
      </div>
    </>
  );
}