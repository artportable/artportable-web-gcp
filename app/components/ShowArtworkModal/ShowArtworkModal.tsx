import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import { styles } from './showArtworkModal.css'

export default function ShowArtworkModal({ open, setOpen }) {
  const s = styles();

  const handleClose = () => {
    console.log('handleclose');
    setOpen(false);
  }
  
  return (
    
    <Modal
      className={s.modal}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
        <Card className={s.modalContent}>
          <Paper>Testing!</Paper>
        </Card>
    </Modal>
  );
}