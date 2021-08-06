import styles from './profileCoverPhoto.css'
import Button from '../../components/Button/Button'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import { useTranslation } from 'next-i18next';

export const ProfileCoverPhoto = ({ coverPhoto, isMyProfile }) => {
  const s = styles();
  const { t } = useTranslation(['profile']);

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  return (
    <div className={s.container}>
      {coverPhoto &&
        <img
          src={`${bucketUrl}${coverPhoto}`}
          alt="Cover image"
          className={s.profileCoverPhoto}
          style={{ transform: 'translate(0, -50%) scale(1)'}}
        />
      }
      
      {isMyProfile &&
        <div className={s.buttonContainer}>
          <div className={s.buttonPosition}>
            <Button
              size="small"
              variant="contained"
              color="default"
              rounded
              startIcon={<CameraAltIcon />}>
                {t('edit')}
            </Button>
          </div>
        </div>
      }
     
    </div>
  );
}

export default ProfileCoverPhoto;