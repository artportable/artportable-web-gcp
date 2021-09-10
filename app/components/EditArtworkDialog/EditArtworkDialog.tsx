import Dialog from '@material-ui/core/Dialog'
import { styles } from "./editArtworkDialog.css";
import { useTranslation } from "next-i18next";

export default function EditArtworkDialog({ artwork, open, onClose }) {
  const { t } = useTranslation(['tags']);
  const s = styles();

  return (
    <Dialog open={open} onClose={onClose}>
      ello
    </Dialog>
  );
}