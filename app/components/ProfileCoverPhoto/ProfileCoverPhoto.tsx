import styles from './profileCoverPhoto.css'
import Button from '../../components/Button/Button'
import CameraAltIcon from '@material-ui/icons/CameraAlt'

export const ProfileCoverPhoto = () => {
  const s = styles();

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  return (
    <div className={s.container}>
      <img
        src={`${bucketUrl}907d3d64-ca20-4595-9697-a6218576e7af.jpg`}
        alt="Cover image"
        className={s.profileCoverPhoto}
        style={{ transform: 'translate(0, -50%) scale(1)'}}
      />
      
      <div className={s.buttonContainer}>
        <div className={s.buttonPosition}>
          <Button
            size="small"
            variant="contained"
            color="default"
            rounded
            startIcon={<CameraAltIcon />}>
              Redigera
          </Button>
        </div>
      </div>
     
    </div>
  );
}

export default ProfileCoverPhoto;