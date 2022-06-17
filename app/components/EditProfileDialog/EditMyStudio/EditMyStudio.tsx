import { useState } from 'react'
import Button from '../../Button/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'


import { TextField, Typography } from '@material-ui/core'
import { useTranslation } from 'next-i18next';
import { styles } from './editMyStudio.css';

export const EditMyStudio = ({ profile, setProfile }) => {
  const s = styles();
  const { t } = useTranslation('profile');

  const [hasStudio, setHasStudio] = useState(!!profile.myStudio);

  const setStudioName = (newName: string) => {
    setProfile({ ...profile, myStudio: {
      ...profile.myStudio,
      Text: newName
    }})
  }

  const setStudioLocation = (newLocation: string) => {
    setProfile({ ...profile, myStudio: {
      ...profile.myStudio,
      Location: newLocation
    }})
  }

  return (
    <>
      <div className={s.headerContainer}>
        <Typography variant="subtitle2" component="h4">
          {t('myArtStudio')}
        </Typography>

        {!hasStudio ? 
          <Button
            variant="text"
            color="primary"
            startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
            onClick={() => setHasStudio(true)}
            >
              {t('addStudio')}
          </Button>
          :
          <Button
            variant="text"
            startIcon={<DeleteIcon color="error" />}
            onClick={() => setHasStudio(false)}
            >
              {t('remove')}
          </Button>
        }
      </div>

      { hasStudio &&
        <div className={s.fieldsContainer}>
          <TextField 
            label={t('name')}
            defaultValue={profile?.myStudio?.Text}
            onChange={(event) => setStudioName(event.target.value)}
            inputProps={{ maxLength: 140 }} />

          <TextField 
            label={t('place')}
            defaultValue={profile?.myStudio?.Location}
            onChange={(event) => setStudioLocation(event.target.value)}
            inputProps={{ maxLength: 140 }} />
        </div>
      }
    </>
  );
}