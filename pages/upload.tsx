import React, { useState } from 'react';
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
import clsx from 'clsx';
import "cropperjs/dist/cropper.css";


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
  const [cropper, setCropper] = useState<any>();
  const [cropperImageUrl, setCropperImageUrl] = useState<any>();
  const [cropperActive, setCropperActive] = useState(false);

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

  const onFilesChanged = (files) => {
    if(files.length === 0) { return; }

    //const imgElement = document.getElementById("testimg") as HTMLImageElement;
    const url = URL.createObjectURL(files[0]);
    //imgElement.src = url;
    setCropperImageUrl(url);
    setCropperActive(true);
  }

  const onCropperInitialized = (cropperInstance) => {
    console.log("Initialized cropper");
    setCropper(cropperInstance);
  }

  return (
    <Main>
      <div className={s.mainGrid}>
        <div className={clsx(s.uploadBox, cropperActive && s.hide )}>
          <DropzoneArea
            classes={{root: s.dropzone}}
            acceptedFiles={['image/*']}
            dropzoneText={t('dragandDropOrClick')}
            onChange={onFilesChanged}
            onDrop={(files) => console.log('File added:', files)}
            showPreviews={false}
            showPreviewsInDropzone={false}
            filesLimit={3}
            maxFileSize={2000000000} />
        </div>
        <div className={s.cropperBox}>
          <Cropper
            src={cropperImageUrl}
            onInitialized={onCropperInitialized}
            style={{ height: '100%', width: '100%' }}
            // // Cropper.js options
            initialAspectRatio={16 / 9}
            preview={`.${s.cropperPreview}`}
            // guides={false}
            // crop={onCrop}
            // ref={cropperRef}
          />
        </div>

        <div className={s.cropperOptions}>
          <Button            
            color="primary"
            variant="contained"
            disableElevation
            rounded>
              Options
            </Button>
        </div>

        <div className={s.previewsContainer}>
          <div className={s.cropperPreview}></div>
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
