import React, { useRef, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../app/components/Main/Main'
import UploadForm from '../app/components/UploadForm/UploadForm';
import { useGetTags, usePostArtwork } from '../app/hooks/dataFetching/Artworks';
import styles from '../styles/upload.css'
import { DropzoneArea } from 'material-ui-dropzone'
import Button from '../app/components/Button/Button';
import { useTranslation } from 'next-i18next';
import { Artwork } from '../app/models/Artwork';
import { useStore } from 'react-redux';
import { Cropper } from 'react-cropper';

export default function UploadArtworkPage() {
  const s = styles();
  const { t } = useTranslation(['upload']);
  const store = useStore();

  const username = store.getState()?.user?.username;
  const tags = useGetTags();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  const uploadArtwork = () => {
    const artwork: Artwork = {
      Title: title,
      Description: description,
      Price: price,
      Tags: selectedTags,
      PrimaryFile: "enekorre.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
    const res = usePostArtwork(artwork, username);
  }

  // const cropperRef = useRef<HTMLImageElement>(null);
  // const onCrop = () => {
  //   const imageElement: any = cropperRef?.current;
  //   const cropper: any = imageElement?.cropper;
  //   console.log(cropper.getCroppedCanvas().toDataURL());
  // };

  return (
    <Main>
      <div className={s.mainGrid}>
        <div className={s.uploadBox}>
          <DropzoneArea
            classes={{root: s.dropzone}}
            acceptedFiles={['image/*']}
            dropzoneText={t('dragandDropOrClick')}
            onChange={(files) => console.log('Files:', files)}
            showPreviews={true}
            showPreviewsInDropzone={false}
            filesLimit={3}
            maxFileSize={2000000000} />
        </div>
        <div className={s.previewsContainer}>
          <Cropper
            src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
            style={{ height: 100, width: 100 }}
            // // Cropper.js options
            // initialAspectRatio={16 / 9}
            // guides={false}
            // crop={onCrop}
            // ref={cropperRef}
          />
        </div>
        <div className={s.form}>
          {tags.isLoading && <div>loading...</div>}
          {tags.isError && <div>error...</div>}
          {tags.data && !tags.isLoading && !tags.isError &&
            <UploadForm
              setTitle={setTitle}
              setDescription={setDescription}
              setPrice={setPrice}
              setSelectedTags={setSelectedTags}
              selectedTags={selectedTags}
              tags={tags.data}
            ></UploadForm>
          }
          <Button
            color="primary"
            variant="contained"
            className={s.uploadButton}
            disableElevation
            rounded
            onClick={uploadArtwork}>
              {t('upload')}
          </Button>
        </div>
      </div>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['header', 'upload', 'tags']),
    }
  };
}
