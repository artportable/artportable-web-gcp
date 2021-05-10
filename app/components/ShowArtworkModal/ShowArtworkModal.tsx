import Link from 'next/link'
import Image from 'next/image'
import { Dialog, DialogContent } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { styles } from './showArtworkModal.css'
import Button from '../Button/Button';

import { useTranslation } from "next-i18next"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { capitalizeFirst } from '../../utils/util'

export default function ShowArtworkModal({ open, setOpen, artwork, onLikeClick }) {
  const s = styles();
  const { t } = useTranslation(['common']);

  //TODO: use useMediaQuery for responsive design
  //const isSm = useMediaQuery('(min-width:600px)');

  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

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
          <Link href={`/@${artwork.Owner?.Username}`}>
            <a>
              <CardHeader
                classes={{
                  root: s.modalHeader,
                  title: s.colorWhite,
                  subheader: s.colorWhite,
                  action: s.followButton
                }}
                avatar={
                  artwork.Owner?.ProfilePicture ? (
                    <Avatar src={`${bucketUrl}${artwork.Owner?.ProfilePicture}`}
                      alt="Profile picture"
                      style={{ height: '40px', width: '40px' }}
                    />
                  ) : (
                    <AccountCircleIcon
                      color="secondary"
                      style={{fontSize: 48}}
                    />
                  )
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
              <Image 
                src={`${bucketUrl}${artwork.PrimaryFile.Name}`}
                width={1000}
                height={770}
                objectFit="contain"></Image>
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
                  <Image
                    src={`${bucketUrl}${artwork.SecondaryFile.Name}`}
                    width={450}
                    height={370}
                    objectFit="contain"></Image>
                </div>
              }
              {artwork.TertiaryFile &&
                <div className={s.imageContainer}>
                  <Image
                    src={`${bucketUrl}${artwork.TertiaryFile.Name}`}
                    width={450}
                    height={370}
                    objectFit="contain"></Image>
                </div>
              }
            </Box>
          </Box>
        </DialogContent>
    </Dialog>
  );
}