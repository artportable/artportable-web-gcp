import { TextField, Badge, IconButton } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import { EditDialogSection } from '../EditDialogSection/EditDialogSection'
import Button from '../../Button/Button'
import { useTranslation } from 'react-i18next'
import { styles } from './editExhibitions.css'

import { Exhibition } from '../EditProfileDialog'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { addDays } from 'date-fns'
import { v4 } from 'uuid'



export const EditExhibitions = ({ profile, setProfile }) => {
  const s = styles();
  const { t } = useTranslation('profile');

  const deleteExhibition = (exhibition: Exhibition) => {
    const newExhibitions = profile.exhibitions.filter(e => e !== exhibition);
    setProfile({ ...profile, exhibitions: newExhibitions })
  }
  
  const addExhibition = () => {
    profile.exhibitions.push({ key: v4(), from: new Date(), to: addDays(new Date(), 1)});
    setProfile({...profile});
  };

  const setFrom = (exhibition: Exhibition, newFrom: Date) => {
    exhibition.from = newFrom;
    setProfile({ ...profile });
  }

  const setTo = (exhibition: Exhibition, newTo: Date) => {
    exhibition.to = newTo;
    setProfile({ ...profile });
  }

  const setLocationName = (exhibition: Exhibition, newLocationName: string) => {
    exhibition.locationName = newLocationName;
    setProfile({ ...profile });
  }

  const setLocation = (exhibition: Exhibition, newLocation: string) => {
    exhibition.location = newLocation;
    setProfile({ ...profile });
  }



  return (
    <EditDialogSection title={t('exhibitions')}>
      {profile?.exhibitions?.map((e, i) => 
      <Badge
        key={e.key}
        overlap="rectangle"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{ root: s.badgeRoot }}
        badgeContent={
          <IconButton onClick={() => deleteExhibition(e)}>
            <DeleteIcon
              color="error" />
          </IconButton>
        }
      >
        <div className={s.exhibitionsContainer}>
          <div className={s.fromToContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                label={t('from')}
                format="MM/dd/yyyy"
                minDate={new Date()}
                value={e.from}
                InputAdornmentProps={{position: 'start'}}
                onChange={date => setFrom(e, date)}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                label={t('to')}
                format="MM/dd/yyyy"
                value={e.to}
                minDate={e.from}
                InputAdornmentProps={{position: 'start'}}
                onChange={date => setTo(e, date)}
              />
            </MuiPickersUtilsProvider>
          </div>

          <TextField 
            label={t('locationName')} 
            defaultValue={e.locationName}
            onChange={(event) => setLocationName(e, event.target.value)} />
          
          <TextField 
            label={t('location')} 
            defaultValue={e.location}
            onChange={(event) => setLocation(e, event.target.value)} />
        </div>
      </Badge>
      )}
      <Button
        variant="text"
        color="primary"
        startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
        onClick={() => addExhibition()}
        >
          {t('addExhibition')}
      </Button>
    </EditDialogSection>
  );
}