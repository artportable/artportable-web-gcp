import Link from 'next/link'
import { Dialog, DialogContent } from '@material-ui/core'
import { CardHeader } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { styles } from './showArtworkModal.css'
import Button from '../Button/Button';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'

import { useTranslation } from "next-i18next"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { capitalizeFirst } from '../../utils/util'

export default function ShowArtworkModal({ open, setOpen, artwork, onLikeClick }) {
  const s = styles();
  const { t } = useTranslation(['common']);

  //TODO: use useMediaQuery for responsive design
  //const isSm = useMediaQuery('(min-width:600px)');

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog
      classes={{
        paper: s.dialogPaper
      }}
      open={open}
      scroll="body"
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="artwork-modal-title"
      aria-describedby="artwork-modal-description"
      BackdropProps={{ 
        className: s.backdrop
      }}>
        <DialogContent className={s.modalContainer}> 
          <Link href={`/profile/@${artwork.Owner?.Username}`}>
            <a>
              <CardHeader
                classes={{
                  root: s.modalHeader,
                  title: s.colorWhite,
                  subheader: s.colorWhite,
                  action: s.followButton
                }}
                avatar={
                  <ProfileAvatar 
                    size={48} 
                    profilePicture={`${artwork.Owner?.ProfilePicture}`} 
                  />
                }
                title={artwork.Owner?.Username}
                subheader={
                  <Box>
                    <span>{artwork.Owner?.Location}</span>
                  </Box>
                }
                action={
                  <Button
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    rounded>
                    {capitalizeFirst(t('common:words.follow'))}
                  </Button>
                }
              />
            </a>
          </Link>

          {/* <Box className={s.rightActions}>right</Box> */}

          <Box className={s.modalContent}>
            <Box className={s.tagsContainer} marginBottom={2}>
              {artwork.Tags?.map(tag => <Chip key={tag} label={tag} color="primary"></Chip>)}
            </Box>
            <div className={s.imageContainer}>
              <img
                src={`${bucketUrl}${artwork.PrimaryFile.Name}`}
                className={s.primaryImage}
                alt={`${artwork?.Title ? artwork?.Title : 'artwork'}`}
              />
            </div>
            <Box textAlign="center" marginY={2}>
              <Typography variant="h3" component="h2" id="artwork-modal-title">
                <Box fontWeight="500" fontFamily="LyonDisplay" marginBottom={2}>
                  {artwork.Title}
                </Box>
              </Typography>
              <Typography variant="body1" id="artwork-modal-description">
                {artwork.Description}
              </Typography>
            </Box>
            <Box className={s.extraImages}>
              {artwork.SecondaryFile &&
                <div className={s.imageContainer}>
                  <img
                    src={`${bucketUrl}${artwork.SecondaryFile.Name}`}
                    className={s.extraImage}
                    alt={`${artwork?.Title ? artwork?.Title : 'artwork'}`}
                  />
                </div>
              }
              {artwork.TertiaryFile &&
                <div className={s.imageContainer}>
                  <img
                    src={`${bucketUrl}${artwork.TertiaryFile.Name}`}
                    className={s.extraImage}
                    alt={`${artwork?.Title ? artwork?.Title : 'artwork'}`}
                  />
                </div>
              }
            </Box>
          </Box>
        </DialogContent>
    </Dialog>
  );
}