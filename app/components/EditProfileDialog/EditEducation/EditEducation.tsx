import { TextField, Badge, IconButton, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import { EditDialogSection } from '../EditDialogSection/EditDialogSection'
import Button from '../../Button/Button'
import { useTranslation } from 'react-i18next'
import { styles } from './editEducation.css'

import { Education } from '../EditProfileDialog'
import { getYear } from 'date-fns'



export const EditEducation = ({ profile, setProfile }) => {
  const s = styles();
  const { t } = useTranslation('profile');
  const currentYear = getYear(new Date());

  const generateYears = () => {
    const yearsBackwards = 70;
    const firstYear = currentYear - yearsBackwards;

    return Array.from({length: yearsBackwards}, (_, i) => firstYear + (i + 1));    
  }

  const possibleYears = generateYears(); 

  const deleteEducation = (education: Education) => {
    const newEducations = profile.educations.filter(e => e !== education);
    setProfile({ ...profile, educations: newEducations })
  }
  
  const addEducation = () => {
    profile.educations.push({});
    setProfile({...profile});
  };

  const setFrom = (education: Education, newFrom: any) => {
    education.from = newFrom;
    setProfile({ ...profile });
  }

  const setTo = (education: Education, newTo: any) => {
    education.to = newTo;
    setProfile({ ...profile });
  }

  const setName = (education: Education, newName: string) => {
    education.name = newName;
    setProfile({ ...profile });
  }



  return (
    <EditDialogSection title={t('education')}>
      {profile?.educations?.map((e, i) => 
      <Badge
        key={e.key}
        overlap="rectangle"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{ root: s.badgeRoot }}
        badgeContent={
          <IconButton onClick={() => deleteEducation(e)}>
            <DeleteIcon
              color="error" />
          </IconButton>
        }
      >
        <div className={s.educationContainer}>
          <div className={s.fromToContainer}>
            <FormControl>
              <InputLabel id="select-from-label">{t('from')}</InputLabel>
              <Select
                labelId="select-from-label"
                id="select-from"
                value={e.from}
                onChange={(event) => setFrom(e, event.target.value)}
              >
                {possibleYears.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl >
              <InputLabel id="select-to-label">{t('to')}</InputLabel>
              <Select
                labelId="select-to-label"
                id="select-to"
                value={e.to}
                onChange={(event) => setTo(e, event.target.value)}
              >
                {possibleYears.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
              </Select>
            </FormControl>
          </div>

          <TextField 
            label={t('diploma')} 
            defaultValue={e.name}
            onChange={(event) => setName(e, event.target.value)} />     
        </div>
      </Badge>
      )}
      <Button
        variant="text"
        color="primary"
        startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
        onClick={() => addEducation()}
        >
          {t('addEducation')}
      </Button>
    </EditDialogSection>
  );
}