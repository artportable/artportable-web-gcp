import Main from '../app/components/Main/Main'
import styles from '../styles/upload.css'

export default function UploadArtworkPage() {
  const s = styles();

  return (
    <Main>
      <div className={s.mainGrid}>
        <div className={s.uploadBox}>
          <div>Drag your files here</div>
        </div>
        <div className={s.previewsContainer}>previews</div>
        <div className={s.form}>form</div>
      </div>
    </Main>
  );
}