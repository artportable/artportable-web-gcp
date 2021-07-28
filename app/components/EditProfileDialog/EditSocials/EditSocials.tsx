import { TextField, IconButton, InputAdornment } from '@material-ui/core'
import { EditDialogSection } from '../EditDialogSection/EditDialogSection'
import { useTranslation } from 'react-i18next'

import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import LanguageIcon from '@material-ui/icons/Language';
import ClearIcon from '@material-ui/icons/Clear';
import Icon from '@material-ui/core/Icon';



export const EditSocials = ({ profile, setProfile }) => {
  const { t } = useTranslation('profile');

  const setSocialMediaProp = (newText: string, propName: string) => {
    profile.socialMedia[propName] = newText;
    setProfile({ ...profile });
  };

  const resetSocialMediaProp = (propName: string, event) => {
    profile.socialMedia[propName] = '';
    event.target.value = '';
    setProfile({ ...profile });
  };

  const ResetAdornment = ({ socialMedia }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={(e) => resetSocialMediaProp(socialMedia, e)}>
          <ClearIcon></ClearIcon>
        </IconButton>
      </InputAdornment>
    );
  }

  return (
    <EditDialogSection title={t('socialNetworks')}>
      <TextField 
        label={t('instagram')} 
        value={profile?.socialMedia.instagram}
        onChange={(event) => setSocialMediaProp(event.target.value, 'instagram')}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <InstagramIcon />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={(e) => resetSocialMediaProp('instagram', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }}  />

      <TextField
        label={t('facebook')} 
        value={profile?.socialMedia.facebook}
        onChange={(event) => setSocialMediaProp(event.target.value, 'facebook')} 
        InputProps={{ 
          startAdornment: (
            <InputAdornment position="start">
              <FacebookIcon />
            </InputAdornment>),
          endAdornment: (<ResetAdornment socialMedia='facebook'></ResetAdornment>)
        }}
      />

      <TextField 
        label={t('linkedIn')} 
        value={profile?.socialMedia.linkedIn}
        onChange={(event) => setSocialMediaProp(event.target.value, 'linkedIn')}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <LinkedInIcon />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={(e) => resetSocialMediaProp('linkedIn', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }} />

      <TextField 
        label={t('dribbble')} 
        value={profile?.socialMedia.dribbble}
        onChange={(event) => setSocialMediaProp(event.target.value, 'dribbble')}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <Icon className="fab fa-dribbble" />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={(e) => resetSocialMediaProp('dribbble', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }}  />

      <TextField 
        label={t('behance')} 
        value={profile?.socialMedia.behance}
        onChange={(event) => setSocialMediaProp(event.target.value, 'behance')}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <Icon className="fab fa-behance-square" />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={(e) => resetSocialMediaProp('behance', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }} />

      <TextField 
        label={t('website')} 
        value={profile?.socialMedia.website}
        onChange={(event) => setSocialMediaProp(event.target.value, 'website')}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <LanguageIcon />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={(e) => resetSocialMediaProp('website', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }} />

    </EditDialogSection>
  );
}