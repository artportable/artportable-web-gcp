import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Button from '../Button/Button'

import { useTranslation } from 'react-i18next'
import { styles } from './editProfileDialog.css'
import { EditMyStudio } from './EditMyStudio/EditMyStudio'
import { EditInspiredBy } from './EditInspiredBy/EditInspiredBy'
import { EditEducation } from './EditEducation/EditEducation'
import { EditExhibitions } from './EditExhibitions/EditExhibitions'

import { v4 } from 'uuid'

interface Profile {
  title: string;
  shortDescription: string;
  location: string;
  longDescription: string;
  myStudio: Studio;
  inspiredBy: string;
  educations: Education[];
  exhibitions: Exhibition[];
}

interface Studio {
  name: string;
  location: string;
}

export interface Education {
  from: number;
  to: number;
  name: string;
}

export interface Exhibition {
  from: Date;
  to: Date;
  locationName: string;
  location: string;
}

export default function EditProfileDialog({ userProfileSummary, userProfile, tags }) {
  const s = styles();
  const { t } = useTranslation('profile');
  
  const [openEdit, setOpenEdit] = useState(false);
  const [profile, setProfile] = useState<Profile>(populateProfileObject(userProfileSummary, userProfile));

  useEffect(() => {
    setProfile(populateProfileObject(userProfileSummary, userProfile));
  }, [userProfileSummary]);



  const handleDeleteTag = (_) => {
    setOpenEdit(false);
  }

  return (
    <>
      <div className={s.buttonPosition}>
        <Button
          size="small"
          variant="contained"
          color="default"
          rounded
          startIcon={<EditIcon />}
          onClick={() => setOpenEdit(true)}>
            {t('editProfile')}
        </Button>
      </div>
      
      <Dialog
       open={openEdit}
       onClose={() => setOpenEdit(false)}
       maxWidth="md"
       aria-labelledby="artwork-modal-title"
       aria-describedby="artwork-modal-description"
       >
        <DialogTitle>{t('editProfile')}</DialogTitle>
        <DialogContent>
          <form className={s.form}>
            <div className={s.flexColumn}>
              <Typography variant="subtitle1" component="h3">
                {t('shortBioSection')}
              </Typography>

              <TextField 
                label={t('title')} 
                defaultValue={profile.title} 
                onChange={(event) => setProfile({ ...profile, title: event.target.value })} />

              <TextField 
                label={t('shortDescription')} 
                defaultValue={profile.shortDescription}
                multiline
                onChange={(event) => setProfile({ ...profile, shortDescription: event.target.value })} />

              <TextField 
                label={t('location')} 
                defaultValue={profile.location} 
                onChange={(event) => setProfile({ ...profile, location: event.target.value })} />

              <TextField 
                label={t('longDescription')} 
                defaultValue={profile.shortDescription}
                multiline
                onChange={(event) => setProfile({ ...profile, longDescription: event.target.value })} />
            </div>
            <div>
              <EditMyStudio profile={profile} setProfile={setProfile}></EditMyStudio>
            </div>
            <div>
              <EditInspiredBy profile={profile} setProfile={setProfile}></EditInspiredBy>
            </div>
            <div>
              <EditEducation profile={profile} setProfile={setProfile}></EditEducation>
            </div>
            <div>
              <EditExhibitions profile={profile} setProfile={setProfile}></EditExhibitions>
            </div>

            
          </form>
        </DialogContent>
      </Dialog>
    </>  
  );
}

const populateProfileObject = (userProfileSummary, userProfile): Profile => {
  return {
    title: userProfileSummary?.Title,
    shortDescription: userProfileSummary?.Headline,
    location: userProfileSummary?.Location,
    longDescription: userProfile?.About,
    myStudio: userProfile?.Studio,
    inspiredBy: userProfile?.InspiredBy,
    educations: userProfile?.Educations.map(e => ({ 
      from: new Date(e.From, 0, 0),
      to: new Date(e.To, 0, 0),
      name: e.Name,
      key: v4()
    })),
    exhibitions: userProfile?.Exhibitions.map(e => ({ 
      key: v4(),
      from: e.From,
      to: e.To,
      locationName: e.Name,
      location: e.Place
    })),
  }
}