import React, { useState, useRef, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../app/components/Main/Main'
import UploadForm from '../app/components/UploadForm/UploadForm';
import { useGetTags, usePostArtwork } from '../app/hooks/dataFetching/Artworks';
import styles from '../styles/upload.css'
import { DropzoneArea } from 'material-ui-dropzone'
import ArtButton from '../app/components/Button/Button';
import { useTranslation } from 'next-i18next';
import { Artwork } from '../app/models/Artwork';
import { useStore } from 'react-redux';
import { Cropper } from 'react-cropper';
import clsx from 'clsx';
import CropperOptions from '../app/components/CropperOptions/CropperOptions';
import "cropperjs/dist/cropper.css";
import { CircularProgress, Paper, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


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
  const [deletedFile, setDeletedFile] = useState(false);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  //Cropped images
  const [croppedPrimary, setCroppedPrimary] = useState(null);
  const [namePrimary, setNamePrimary] = useState(null);
  const [croppedSecondary, setCroppedSecondary] = useState(null);
  const [nameSecondary, setNameSecondary] = useState(null);
  const [croppedTertiary, setCroppedTertiary] = useState(null);
  const [nameTertiary, setNameTertiary] = useState(null);
  
  const cropperRef = useRef(null);

  useEffect(() => {
    if(cropper !== undefined) {
      cropper.setDragMode('move');
    }
  });

  const uploadArtwork = () => {
    const artwork: Artwork = {
      Title: title,
      Description: description,
      Price: price,
      Tags: selectedTags,
      PrimaryFile: namePrimary,
      SecondaryFile: nameSecondary,
      TertiaryFile: nameTertiary
    }
    setUploadSnackbarOpen(true);
    const res = usePostArtwork(artwork, username);
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setUploadSnackbarOpen(false);
  }

  const onFilesChanged = (files) => {
    if(files.length === 0) { return; }


    const url = URL.createObjectURL(files[files.length - 1]);
    setCropperImageUrl(url);

    if(deletedFile === true) {
      setDeletedFile(false);
    } else {
      setCropperActive(true);
    }
  }

  const onCropperInitialized = (cropperInstance) => {
    setCropper(cropperInstance);
  }


  const onCrop = () => {
    // Upload image and set image name
    const width = Math.round(cropper.getData().width);
    const height = Math.round(cropper.getData().height);
    cropper.getCroppedCanvas().toBlob((blob) => { uploadImage(blob, width, height) }, 'image/jpeg');

    // Show preview
    const dataUrl = cropper.getCroppedCanvas().toDataURL('image/jpeg');
    if(croppedPrimary === null) {
      setCroppedPrimary(dataUrl);
    } else if (croppedSecondary === null) {
      setCroppedSecondary(dataUrl);
    } else if (croppedTertiary === null) {
      setCroppedTertiary(dataUrl);
    }

    setCropperActive(false);
  }

  const onDiscard = () => {
    setCropperActive(false);
    const uploadedImgButtons: NodeListOf<HTMLButtonElement> 
      = document.querySelectorAll('.MuiDropzonePreviewList-removeButton');
    
    //Click the last button to remove image from dropzone component
    uploadedImgButtons[uploadedImgButtons.length - 1].click();
    setDeletedFile(true);
  }

  const uploadImage = (blob, width: number, height: number) => {
    fetch(`http://localhost:5001/api/images?w=${width}&h=${height}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg'
      },
      body: blob
    })
    .then((response) => {
      if (!response.ok) {
        console.log(response.statusText);
        throw response;
      }
      return response.text();
    })
    .then((name) => {
      if (namePrimary == null) {
        setNamePrimary(name);
      } else if (nameSecondary == null) {
        setNameSecondary(name);
      } else if (nameTertiary == null) {
        setNameTertiary(name);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <Main>
      <div className={s.mainGrid}>
        <div className={s.uploadBox}>
          <DropzoneArea
            classes={{root: `${s.dropzone} ${cropperActive ? s.hide : ''}`}}
            acceptedFiles={['image/*']}
            dropzoneText={t('dragandDropOrClick')}
            onChange={onFilesChanged}
            showPreviews={false}
            showPreviewsInDropzone={true}
            filesLimit={3}
            maxFileSize={2000000000} />
        </div>

        <div className={s.cropperBox}>
          <Cropper
            className={clsx(s.cropper, !cropperActive && s.hide)}
            src={cropperImageUrl}
            onInitialized={onCropperInitialized}
            initialAspectRatio={1}
            autoCropArea={1}
            preview={`.${s.cropperPreview}`}
            ref={cropperRef}
          />
        </div>

        <CropperOptions show={cropperActive} cropper={cropper} onCrop={onCrop} onDiscard={onDiscard}></CropperOptions>

        <div className={s.previewsContainer}>
        {croppedPrimary && 
        <Paper elevation={3} className={s.previewItem}>
          <img src={croppedPrimary} />
        </Paper>
        }
        {croppedSecondary && 
        <Paper elevation={3} className={s.previewItem}>
          <img src={croppedSecondary} />
        </Paper>
        }
        {croppedTertiary && 
        <Paper elevation={3} className={s.previewItem}>
          <img src={croppedTertiary} />
        </Paper>
        }
        {!croppedTertiary && cropperActive &&
          <Paper elevation={3} className={s.previewItem}>
            <div className={s.cropperPreview}></div>
          </Paper>
        }
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
          <div>
            <ArtButton
              color="primary"
              variant="contained"
              className={s.uploadButton}
              disabled={!croppedPrimary}
              disableElevation
              rounded
              onClick={uploadArtwork}>
                {t('upload')}
            </ArtButton>
          </div>
          <Snackbar open={uploadSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} variant="filled" severity="success">
              {t('artworkUploadedSuccessfully')}
            </Alert>
          </Snackbar>
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
