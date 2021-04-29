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

    const res = usePostArtwork(artwork, username);
  }

  const onFilesChanged = (files) => {
    if(files.length === 0) { return; }

    const url = URL.createObjectURL(files[files.length - 1]);
    setCropperImageUrl(url);
    setCropperActive(true);
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
        <div className={clsx(s.uploadBox, cropperActive && s.hide)}>
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
            className={clsx(s.cropper, !cropperActive && s.hide)}
            src={cropperImageUrl}
            onInitialized={onCropperInitialized}
            initialAspectRatio={1}
            autoCropArea={1}
            preview={`.${s.cropperPreview}`}
            ref={cropperRef}
          />
        </div>

        {cropperActive &&
          <CropperOptions cropper={cropper} onCrop={onCrop} onDiscard={onDiscard}></CropperOptions>
        }

        <div className={s.previewsContainer}>
        {croppedPrimary && 
        <div style={{ height: "100%", display: 'flex', alignItems: 'center' }}>
          <img style={{ width: "100%" }} object-fit="scale-down" src={croppedPrimary} />
        </div>
        }
        {croppedSecondary && 
        <div style={{ height: "100%", display: 'flex', alignItems: 'center' }}>
          <img style={{ width: "100%" }} object-fit="scale-down" src={croppedSecondary} />
        </div>
        }
        {croppedTertiary && 
        <div style={{ height: "100%", display: 'flex', alignItems: 'center' }}>
          <img style={{ width: "100%" }} object-fit="scale-down" src={croppedTertiary} />
        </div>
        }
        {!croppedTertiary && cropperActive &&
          <div className={s.cropperPreview}></div>
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
          <ArtButton
            color="primary"
            variant="contained"
            className={s.uploadButton}
            disableElevation
            rounded
            onClick={uploadArtwork}>
              {t('upload')}
          </ArtButton>
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
