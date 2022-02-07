import React, { useState, useRef, useEffect, useContext } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../app/components/Main/Main'
import UploadForm from '../app/components/UploadForm/UploadForm';
import { useGetTags, usePostArtwork } from '../app/hooks/dataFetching/Artworks';
import styles from '../styles/upload.css'
import { DropzoneArea } from 'material-ui-dropzone'
import ArtButton from '../app/components/Button/Button';
import { useTranslation } from 'next-i18next';
import { ArtworkForCreation } from '../app/models/Artwork';
import { Cropper } from 'react-cropper';
import clsx from 'clsx';
import CropperOptions from '../app/components/CropperOptions/CropperOptions';
import "cropperjs/dist/cropper.css";
import { Paper, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { useRouter } from 'next/router';
import { TokenContext } from '../app/contexts/token-context';
import { UserContext } from '../app/contexts/user-context';
import WarningMessage from '../app/components/WarningMessage/WarningMessage';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { isNullOrUndefined } from '../app/utils/util';
import { Membership } from '../app/models/Membership';
import { ActionType, CategoryType, trackGoogleAnalytics } from '../app/utils/googleAnalytics';
import useRefreshToken from '../app/hooks/useRefreshToken';


export default function UploadArtworkPage() {
  const s = styles();
  const { t } = useTranslation(['upload']);
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { username, socialId, isSignedIn, membership } = useContext(UserContext);
  const tags = useGetTags();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [soldOutChecked, setSoldOutChecked] = useState(false);
  const [multipleSizesChecked, setMultipleSizesChecked] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [cropper, setCropper] = useState<any>();
  const [cropperImageUrl, setCropperImageUrl] = useState<any>();
  const [cropperActive, setCropperActive] = useState(false);
  const [deletedFile, setDeletedFile] = useState(false);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const token = useContext(TokenContext);

  //Cropped images
  const [croppedPrimary, setCroppedPrimary] = useState(null);
  const [namePrimary, setNamePrimary] = useState(null);
  const [croppedSecondary, setCroppedSecondary] = useState(null);
  const [nameSecondary, setNameSecondary] = useState(null);
  const [croppedTertiary, setCroppedTertiary] = useState(null);
  const [nameTertiary, setNameTertiary] = useState(null);

  const [mobileImg, setMobileImg] = useState('');
  const [mobileImgBlob, setMobileImgBlob] = useState(null);
  const mobilePreviewImageRef = useRef(null);

  const cropperRef = useRef(null);

  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    if (!isSignedIn.value || membership.value < Membership.Portfolio) {
      router.push('/');
    }

    if (cropper !== undefined) {
      cropper.setDragMode('move');
    }
  });

  const uploadArtwork = async () => {
    if (isDesktop) {
      if (title && ((width && height) || multipleSizesChecked)) {
        const artwork: ArtworkForCreation = {
          Title: title,
          Description: description,
          Price: price,
          SoldOut: soldOutChecked,
          MultipleSizes: multipleSizesChecked,
          Width: width,
          Height: height,
          Depth: depth,
          Tags: selectedTags,
          PrimaryFile: namePrimary,
          SecondaryFile: nameSecondary,
          TertiaryFile: nameTertiary
        }
        setUploadSnackbarOpen(true);
        const res = usePostArtwork(artwork, socialId.value, token);
        router.push('/profile/@' + username.value);
      }
    } else {
      const name = await uploadImage(
        mobileImgBlob,
        mobilePreviewImageRef.current.naturalWidth,
        mobilePreviewImageRef.current.naturalHeight);

      if (name !== null && title && ((width && height) || multipleSizesChecked)) {
        const artwork: ArtworkForCreation = {
          Title: title,
          Description: description,
          Price: price,
          SoldOut: soldOutChecked,
          MultipleSizes: multipleSizesChecked,
          Width: width,
          Height: height,
          Depth: depth,
          Tags: selectedTags,
          PrimaryFile: name as any,
          SecondaryFile: nameSecondary,
          TertiaryFile: nameTertiary
        }
        setUploadSnackbarOpen(true);
        usePostArtwork(artwork, socialId.value, token);
        router.push('/profile/@' + username.value);
      }
    }
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setUploadSnackbarOpen(false);
  }

  const onFilesChanged = (files) => {
    if (files.length === 0) { return; }


    const url = URL.createObjectURL(files[files.length - 1]);
    setCropperImageUrl(url);

    if (deletedFile === true) {
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
    const width = Math.round(cropper?.getData()?.width);
    const height = Math.round(cropper?.getData()?.height);
    cropper.getCroppedCanvas().toBlob((blob) => { uploadImage(blob, width, height) }, 'image/jpeg');

    // Show preview
    const dataUrl = cropper.getCroppedCanvas().toDataURL('image/jpeg');
    if (croppedPrimary === null) {
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

  const uploadImage = async (blob, width: number, height: number) => {
    return refreshToken().then(() =>
    fetch(`${apiBaseUrl}/api/images?w=${width}&h=${height}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'Authorization': `Bearer ${token}`
      },
      body: blob
    }))
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
        return name;
      })
      .catch((error) => {
        console.log(error);
      })
  }


  const onMobileUpload = event => {
    if (isNullOrUndefined(event?.target?.files[0])) {
      return;
    }

    setMobileImgBlob(new Blob(event?.target?.files))
    const fr = new FileReader;
    fr.onload = function () {
      setMobileImg(fr.result.toString());
    };
    fr.readAsDataURL(event.target.files[0]);
  };

  return (
    <Main>
      <div className={s.mainGrid}>

        {isDesktop ? <>
          <div className={s.uploadBox}>
            <DropzoneArea
              classes={{ root: `${s.dropzone} ${cropperActive ? s.hide : ''}` }}
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
        </>
          :
          <div>
            <div>
              {mobileImg === '' ?
                <div className={clsx(s.mobilePreview, s.noImgPreview)}>
                  <span>{t('previewText')}</span>
                </div>
                :
                <img className={s.mobilePreview} src={mobileImg} ref={mobilePreviewImageRef}></img>
              }
            </div>
            <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={onMobileUpload} />
            <label htmlFor="icon-button-file">
              <ArtButton
                className={s.mobileUploadResetButton}
                size="small"
                variant="contained"
                color="primary"
                startIcon={<AddPhotoAlternateIcon />}
                rounded
                aria-label="upload picture"
                component="span"
              >
                {t('selectImage')}
              </ArtButton>
            </label>
          </div>
        }


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
              title={title}
              setTitle={setTitle}
              setDescription={setDescription}
              setPrice={setPrice}
              soldOutChecked={soldOutChecked}
              setSoldOutChecked={setSoldOutChecked}
              multipleSizesChecked={multipleSizesChecked}
              setMultipleSizesChecked={setMultipleSizesChecked}
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
              setDepth={setDepth}
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
              disabled={!croppedPrimary && mobileImg === ''}
              disableElevation
              rounded
              onClick={() => { uploadArtwork(); trackGoogleAnalytics(ActionType.UPLOAD_IMAGE_CONFIRM, CategoryType.INTERACTIVE) }}>
              {t('upload')}
            </ArtButton>
            <WarningMessage />
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
      ...await serverSideTranslations(locale, ['header', 'footer', 'upload', 'tags', 'support', 'common', 'plans']),
    }
  };
}
