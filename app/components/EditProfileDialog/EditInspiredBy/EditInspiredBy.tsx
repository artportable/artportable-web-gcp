import { TextField } from '@material-ui/core'
import { EditDialogSection } from '../EditDialogSection/EditDialogSection'
import { useTranslation } from 'next-i18next';
import { styles } from './editInspiredBy.css';

export const EditInspiredBy = ({ profile, setProfile }) => {
  const s = styles();
  const { t } = useTranslation('profile');

  const setInspiredBy = (newText: string) => {
    setProfile({ ...profile, inspiredBy: newText })
  }

  return (
    <EditDialogSection title={t('inspiredBy')}>
      <TextField 
        label={t('inspiredBy')} 
        defaultValue={profile?.inspiredBy}
        multiline
        onChange={(event) => setInspiredBy(event.target.value)} />
    </EditDialogSection>
  );
}