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
import "cropperjs/dist/cropper.css";
import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';


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
  const [aspectRatio, setAspectRatio] = useState("free");

  //Cropped images
  const [croppedPrimary, setCroppedPrimary] = useState(null);
  const [croppedSecondary, setCroppedSecondary] = useState(null);
  const [croppedTertiary, setCroppedTertiary] = useState(null);
  
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
      PrimaryFile: "enekorre.jpg",
      SecondaryFile: null,
      TertiaryFile: null
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

  const getButtonVariant: (btnAspectRatio: string) => "contained" | null
    = (buttonAspectRatio: string) => aspectRatio === buttonAspectRatio ? "contained" : null;

  const changeAspectRatio = (ratio: string, update: boolean = false) => {
    if(ratio !== "free") {
      const numbers: unknown[] = ratio.split(":");
      const numberRatio: number = (numbers[0] as number) / (numbers[1] as number);
      cropper.setAspectRatio(numberRatio);
    } else {
      cropper.setAspectRatio();
    }
    
    setAspectRatio(ratio);
  }


  const cropSaveAndUploadImage = () => {
    if(croppedPrimary === null) {
      setCroppedPrimary(cropper.getCroppedCanvas().toDataURL());
    } else if (croppedSecondary === null) {
      setCroppedSecondary(cropper.getCroppedCanvas().toDataURL());
    } else if (croppedTertiary === null) {
      setCroppedTertiary(cropper.getCroppedCanvas().toDataURL());

      //Go to preview and and upload artwork mode
    }

    setCropperActive(false);


    //UPLOAD TO BUCKET HERE
  }

  const discardImageInCropper = () => {
    setCropperActive(false);
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

        <div className={s.cropperOptions}>
          <ButtonGroup disableElevation variant="outlined" color="primary">
            <Button 
              variant={getButtonVariant("16:9")} 
              onClick={() => changeAspectRatio("16:9", true)}>
              16:9
            </Button>
            <Button 
              variant={getButtonVariant("4:3")} 
              onClick={() => changeAspectRatio("4:3", true)}>
              4:3
            </Button>
            <Button 
              variant={getButtonVariant("free")} 
              onClick={() => changeAspectRatio("free", true)}>
              Free
            </Button>
          </ButtonGroup>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button
              classes={{ startIcon: s.startIcon, root: s.deletIconButton }}
              startIcon={<DeleteIcon />}
              onClick={discardImageInCropper}>
            </Button>
            <Button 
              classes={{ startIcon: s.startIcon }}
              startIcon={<DoneIcon />}
              onClick={cropSaveAndUploadImage}>
            </Button>
          </ButtonGroup>
        </div>

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
