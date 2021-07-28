import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Button from '../Button/Button'

import { useTranslation } from 'react-i18next'
import { useStore } from "react-redux";
import { styles } from './editProfileDialog.css'
import { EditMyStudio } from './EditMyStudio/EditMyStudio'
import { EditInspiredBy } from './EditInspiredBy/EditInspiredBy'
import { EditEducation } from './EditEducation/EditEducation'
import { EditExhibitions } from './EditExhibitions/EditExhibitions'
import { EditSocials } from './EditSocials/EditSocials'

import { v4 } from 'uuid'

interface Profile {
  title: string;
  headline: string;
  location: string;
  about: string;
  studio: Studio;
  inspiredBy: string;
  educations: Education[];
  exhibitions: Exhibition[];
  socialMedia: Socials;
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

export interface Socials {
  instagram: string;
  facebook: string;
  linkedIn: string;
  dribbble: string;
  behance: string;
  website: string;
}

export default function EditProfileDialog({ userProfile }) {
  const s = styles();
  const { t } = useTranslation('profile');
  const store = useStore();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const username = store.getState()?.user?.username;

  
  const [openEdit, setOpenEdit] = useState(false);
  const [profile, setProfile] = useState<Profile>(populateProfileObject(userProfile));

  const makeChanges = async (_) => {
    setOpenEdit(false);
    try {
      await fetch(`${apiBaseUrl}/api/profile/${username}`, {
        method: 'POST',
      });
      
    } catch (error) {
      
    }
  }
  const cancel = (_) => {
    setProfile(populateProfileObject(userProfile));
    setOpenEdit(false);
  };

  useEffect(() => {
    setProfile(populateProfileObject(userProfile));
  }, [userProfile]);

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
                label={t('headline')} 
                defaultValue={profile.headline}
                multiline
                onChange={(event) => setProfile({ ...profile, headline: event.target.value })} />

              <TextField 
                label={t('location')} 
                defaultValue={profile.location} 
                onChange={(event) => setProfile({ ...profile, location: event.target.value })} />

              <TextField 
                label={t('about')} 
                defaultValue={profile.about}
                multiline
                onChange={(event) => setProfile({ ...profile, about: event.target.value })} />
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
            <div>
              <EditSocials profile={profile} setProfile={setProfile}></EditSocials>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={makeChanges} color="primary">
            Submit
          </Button>
          <Button onClick={cancel} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>  
  );
}

const populateProfileObject = (userProfile): Profile => {
  return {
    title: userProfile?.Title,
    headline: userProfile?.Headline,
    location: userProfile?.Location,
    about: userProfile?.About,
    studio: userProfile?.Studio,
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
    socialMedia: {
      instagram: userProfile?.SocialMedia.Instagram,
      facebook: userProfile?.SocialMedia.Facebook,
      linkedIn: userProfile?.SocialMedia.LinkedIn,
      dribbble: userProfile?.SocialMedia.Dribble,
      behance: userProfile?.SocialMedia.Behance,
      website: userProfile?.SocialMedia.Website
    }
  }
}