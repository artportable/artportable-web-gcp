import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import Button from '../Button/Button'
import { useTranslation } from "next-i18next";
import { capitalizeFirst } from '../../utils/util';

interface ArtworkProps{
  open: any,
  onClose: any,
  isArtwork: boolean
}

export default function DeleteArtworkWarningDialog({ open, onClose, isArtwork } : ArtworkProps) {
  const { t } = useTranslation(['art', 'common', 'story']);

  return (
    <Dialog open={open}>
      <DialogTitle>{isArtwork ? t('art:deleteArtworkWarningTitle') : t('story:deleteStoryWarningTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{isArtwork ? t('art:deleteArtworkWarningText') : t('story:deleteStoryWarningText')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text" 
          color="primary"
          disableElevation 
          rounded
          onClick={() => onClose(false)}
        >
          {capitalizeFirst(t('common:words.cancel'))}
        </Button>
        <Button
          variant="contained" 
          disableElevation 
          rounded
          onClick={() => onClose(true)}
        >
          {capitalizeFirst(t('common:words.confirm'))}
        </Button>
      </DialogActions>
    </Dialog>
  );
}