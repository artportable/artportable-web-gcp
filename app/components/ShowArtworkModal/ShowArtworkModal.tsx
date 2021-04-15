import Link from 'next/link'
import Image from 'next/image'
import { Dialog, DialogContent } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box'
import { styles } from './showArtworkModal.css'
import Button from '../Button/Button';

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function ShowArtworkModal({ open, setOpen, artwork, onLikeClick }) {
  const s = styles();
  const isSm = useMediaQuery('(min-width:600px)');
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  const handleClose = () => {
    console.log('handleclose');
    setOpen(false);
  }
  console.log(artwork);
  return (
    <Dialog
      open={open}
      scroll="body"
      onClose={handleClose}
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
                    follow
                  </Button>
                }
              />
            </a>
          </Link>

          {/* <Box className={s.rightActions}>right</Box> */}

          <Box className={s.modalContent}>
            <Box className={s.tagsContainer}>
              {artwork.Tags?.map(tag => <Chip label={tag} color="primary"></Chip>)}
            </Box>
            <h2 id="artwork-modal-title">
              {artwork.Title}
            </h2>
            <p id="artwork-modal-description">
              {artwork.Description}
            </p>
            <Image 
              src={`${bucketUrl}${artwork.PrimaryFile}`}
              width={1000}
              height={600}
              objectFit="contain"></Image>
            <Image 
              src={`${bucketUrl}${artwork.PrimaryFile}`}
              width={1000}
              height={600}
              objectFit="contain"></Image>
                          <Image 
              src={`${bucketUrl}${artwork.PrimaryFile}`}
              width={1000}
              height={600}
              objectFit="contain"></Image>
              

          </Box>
        </DialogContent>
    </Dialog>
  );
}