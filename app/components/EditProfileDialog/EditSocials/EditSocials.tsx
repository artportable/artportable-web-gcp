import { TextField, IconButton, InputAdornment } from '@material-ui/core'
import { EditDialogSection } from '../EditDialogSection/EditDialogSection'
import { useTranslation } from 'next-i18next'

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
        <IconButton aria-label="close" onClick={(e) => resetSocialMediaProp(socialMedia, e)}>
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
        inputProps={{ maxLength: 280 }}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <InstagramIcon />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="close" onClick={(e) => resetSocialMediaProp('instagram', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }}
        helperText={profile.socialMedia.instagram && 
          profile.socialMedia.instagram != '' && 
          !profile?.socialMedia.instagram.match(/(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm) ? 
            t('instagramUrl') : 
            ''
        }/>

      <TextField
        label={t('facebook')} 
        value={profile?.socialMedia.facebook}
        onChange={(event) => setSocialMediaProp(event.target.value, 'facebook')}
        inputProps={{ maxLength: 280 }} 
        InputProps={{ 
          startAdornment: (
            <InputAdornment position="start">
              <FacebookIcon />
            </InputAdornment>),
          endAdornment: (<ResetAdornment socialMedia='facebook'></ResetAdornment>)
        }}
        helperText={profile.socialMedia.facebook && 
          profile.socialMedia.facebook!='' && 
          !profile?.socialMedia?.facebook?.match(/(?:http|https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/ig) ? 
            t('facebookUrl') : 
            ''
        }/>

      <TextField 
        label={t('linkedIn')} 
        value={profile?.socialMedia.linkedIn}
        onChange={(event) => setSocialMediaProp(event.target.value, 'linkedIn')}
        inputProps={{ maxLength: 280 }}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <LinkedInIcon />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="close" onClick={(e) => resetSocialMediaProp('linkedIn', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }}
        helperText={profile.socialMedia.linkedIn && 
          profile.socialMedia.linkedIn != '' && 
          !profile?.socialMedia?.linkedIn?.match(/(?:http|https?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile|company)/gm) ? 
            t('linkedinUrl') : 
            ''
        }/>

      <TextField 
        label={t('dribbble')} 
        value={profile?.socialMedia.dribbble}
        onChange={(event) => setSocialMediaProp(event.target.value, 'dribbble')}
        inputProps={{ maxLength: 280 }}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <Icon className="fab fa-dribbble" />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="clear" onClick={(e) => resetSocialMediaProp('dribbble', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }}
        helperText={profile.socialMedia.dribble && 
          profile.socialMedia.dribble != '' && 
          !profile?.socialMedia?.dribble?.match(/(?:http|https?:\/\/)?([\w]+\.)?behance\.com\//gm) ? 
            t('dribbleUrl') : 
            ''
        }/>

      <TextField 
        label={t('behance')} 
        value={profile?.socialMedia.behance}
        onChange={(event) => setSocialMediaProp(event.target.value, 'behance')}
        inputProps={{ maxLength: 280 }}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <Icon className="fab fa-behance-square" />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton  aria-label="clear" onClick={(e) => resetSocialMediaProp('behance', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }}
        helperText={profile.socialMedia.behance && 
          profile.socialMedia.behance != '' && 
          !profile?.socialMedia?.behance?.match(/(?:http|https?:\/\/)?([\w]+\.)?behance\.com\//gm) ? 
            t('behanceUrl') : 
            ''
        }/>

      <TextField 
        label={t('website')} 
        value={profile?.socialMedia.website}
        onChange={(event) => setSocialMediaProp(event.target.value, 'website')}
        inputProps={{ maxLength: 280 }}
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
            <LanguageIcon />
          </InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="clear" onClick={(e) => resetSocialMediaProp('website', e)}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          )
        }} 
        helperText={profile.socialMedia.website && 
          profile.socialMedia.website != '' && 
          !profile?.socialMedia?.website?.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/ig) ? 
            t('websiteUrl') : 
            ''
        }/>

    </EditDialogSection>
  );
}