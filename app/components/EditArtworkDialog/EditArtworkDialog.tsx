import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '../Button/Button'
import DeleteArtworkWarningDialog from '../DeleteArtworkWarningDialog/DeleteArtworkWarningDialog';
import { styles } from "./editArtworkDialog.css";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from 'react';
import { capitalizeFirst } from '../../utils/util';
import { TokenContext } from '../../contexts/token-context';
import { UserContext } from '../../contexts/user-context';

export default function EditArtworkDialog({ artwork, open, onClose }) {
  const { t } = useTranslation(['art', 'common']);
  const s = styles();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [artworkName, setArtworkName] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');
  const [artworkPrice, setArtworkPrice] = useState('');
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);

  const { username } = useContext(UserContext);
  const token = useContext(TokenContext);

  useEffect(() => {
    if (artwork) {
      setArtworkName(artwork.Title);
      setArtworkDescription(artwork.Description);
      setArtworkPrice(artwork.Price);
    }
  }, [artwork]);

  const onDeleteAlertDialogClose = (confirmedDelete: boolean) => {
    if(confirmedDelete) {
      onClickDeleteConfirm(artwork.Id);
    }

    setDeleteAlertDialogOpen(false);
  }

  const onClickDeleteConfirm = (id: string) => {
    if (username.value && id && id.trim().length > 0) {
      onClose(fetch(`${apiBaseUrl}/api/artworks/${id}?myUsername=${username.value}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }))
    }
  };

  const onConfirmClick = () => {
    if (username.value && artwork.Id && artwork.Id.trim().length > 0) {
      onClose(fetch(`${apiBaseUrl}/api/artworks/${artwork.Id}?myUsername=${username.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "Title": artworkName,
          "Description": artworkDescription,
          "Price": parseInt(artworkPrice, 10),
          "PrimaryFile": artwork.PrimaryFile?.Name,
          "SecondaryFile": artwork.SecondaryFile?.Name,
          "TertiaryFile": artwork.TertiaryFile?.Name,
          "Tags": artwork.Tags
        })
      }));
    }
  }

  const onCancel = () => {
    onClose();
    setArtworkName(artwork.Title);
    setArtworkDescription(artwork.Description);
    setArtworkPrice(artwork.Price);
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="edit-artwork-dialog">{`${t('editArtwork')}: ${artwork?.Title}`}</DialogTitle>
      <DialogContent>
        <form className={s.form}>
          <TextField
            fullWidth
            label={t('artworkTitle')}
            placeholder={t('artworkTitle')}
            value={artworkName}
            onChange={(e) => setArtworkName(e.target.value)}
          >
          </TextField>
          <TextField
            fullWidth
            label={t('artworkDescription')}
            placeholder={t('artworkDescription')}
            multiline
            rows={5}
            value={artworkDescription}
            onChange={(e) => setArtworkDescription(e.target.value)}
          >
          </TextField>
          <TextField
            fullWidth
            label={t('artworkPrice')}
            placeholder={t('artworkPrice')}
            value={artworkPrice}
            type="number"
            InputProps={{
              inputProps: {
                step: 100
              }
            }}
            onChange={(e) => setArtworkPrice(e.target.value)}
          >
          </TextField>
        </form>
        <div className={s.deleteContainer}>
          <Typography>
            Delete artwork?
          </Typography>
          <IconButton onClick={() => setDeleteAlertDialogOpen(true)}>
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text" 
          color="primary"
          disableElevation 
          rounded
          onClick={onCancel}
        >
          {capitalizeFirst(t('common:words.cancel'))}
        </Button>
        <Button
          variant="contained" 
          color="primary"
          disableElevation 
          rounded
          onClick={onConfirmClick}
        >
          {capitalizeFirst(t('common:words.save'))}
        </Button>
      </DialogActions>
      <DeleteArtworkWarningDialog open={deleteAlertDialogOpen} onClose={onDeleteAlertDialogClose} />
    </Dialog>
  );
}