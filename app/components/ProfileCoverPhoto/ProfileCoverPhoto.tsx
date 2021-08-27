import styles from './profileCoverPhoto.css'
import Button from '../../components/Button/Button'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import { useTranslation } from 'next-i18next';
import { isNullOrUndefined } from '../../utils/util';
import { useRef } from 'react';

export const ProfileCoverPhoto = ({ coverPhoto, onUpdateCoverPhoto, isMyProfile }) => {
  const s = styles();
  const { t } = useTranslation(['profile']);

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const coverFileInput = useRef(null);

  const handleFileUpload = event => {
    if (isNullOrUndefined(event?.target?.files[0])) {
      return;
    }

    var fr = new FileReader;
    fr.onload = function() {
      var img = new Image;
      img.onload = function() {
        onUpdateCoverPhoto(event.target.files[0], img.width, img.height, 'cover')
      };

      img.src = fr.result.toString(); // is the data URL because called with readAsDataURL
    };
    fr.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className={s.container}>
      {coverPhoto &&
        <img
          src={`${bucketUrl}${coverPhoto}`}
          alt="Cover image"
          className={s.profileCoverPhoto}
        />
      }
      
      {isMyProfile &&
        <div className={s.buttonContainer}>
          <div className={s.buttonPosition}>
            <input
              ref={coverFileInput}
              onChange={handleFileUpload}
              type="file"
              style={{ display: "none" }}
              multiple={false}
            />
            <Button
              size="small"
              variant="contained"
              color="default"
              rounded
              onClick={() => coverFileInput.current.click()}
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