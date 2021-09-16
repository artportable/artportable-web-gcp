import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import Button from '../Button/Button'
import { useTranslation } from "next-i18next";
import { capitalizeFirst } from '../../utils/util';

export default function DeleteArtworkWarningDialog({ open, onClose }) {
  const { t } = useTranslation(['art', 'common']);

  return (
    <Dialog open={open}>
      <DialogTitle>{t('deleteArtworkWarningTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('deleteArtworkWarningText')}</DialogContentText>
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