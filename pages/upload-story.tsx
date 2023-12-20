import React, { useState, useRef, useEffect, useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Main from "../app/components/Main/Main";
import { usePostStory } from "../app/hooks/dataFetching/Stories";
import styles from "../styles/uploadStory.css";
import { DropzoneArea } from "material-ui-dropzone";
import ArtButton from "../app/components/Button/Button";
import { useTranslation } from "next-i18next";
import { StoryForCreation } from "../app/models/Story";
import { Cropper } from "react-cropper";
import clsx from "clsx";
import CropperOptions from "../app/components/CropperOptions/CropperOptions";
import "cropperjs/dist/cropper.css";
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useRouter } from "next/router";
import { TokenContext } from "../app/contexts/token-context";
import { UserContext } from "../app/contexts/user-context";
import WarningMessage from "../app/components/WarningMessage/WarningMessage";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { isNullOrUndefined } from "../app/utils/util";
import { Membership } from "../app/models/Membership";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../app/utils/googleAnalytics";
import useRefreshToken from "../app/hooks/useRefreshToken";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import StoryForm from "../app/components/StoryForm/StoryForm";

export default function UploadStoryPage({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["upload"]);
  const router = useRouter();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { username, socialId, isSignedIn, membership } =
    useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [cropper, setCropper] = useState<any>();
  const [cropperImageUrl, setCropperImageUrl] = useState<any>();
  const [cropperActive, setCropperActive] = useState(false);
  const [deletedFile, setDeletedFile] = useState(false);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const token = useContext(TokenContext);

  //Cropped images
  const [croppedPrimary, setCroppedPrimary] = useState(null);
  const [namePrimary, setNamePrimary] = useState(null);
  const [croppedSecondary, setCroppedSecondary] = useState(null);
  const [nameSecondary, setNameSecondary] = useState(null);
  const [croppedTertiary, setCroppedTertiary] = useState(null);
  const [nameTertiary, setNameTertiary] = useState(null);

  const [mobileImg, setMobileImg] = useState("");
  const [mobileImgBlob, setMobileImgBlob] = useState(null);
  const mobilePreviewImageRef = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const [color, setColor] = useState("#fff");
  const [text, setText] = useState<string>(t("dragandDropOrClick"));

  const cropperRef = useRef(null);

  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    if (!isSignedIn.value || membership.value < Membership.Base) {
      router.push("/");
    }

    if (cropper !== undefined) {
      cropper.setDragMode("move");
    }
  });

  const uploadStory = async () => {
      const name = await uploadImage(
        mobileImgBlob,
        mobilePreviewImageRef.current.naturalWidth,
        mobilePreviewImageRef.current.naturalHeight
      );

      if (name !== null && title) {
        const story: StoryForCreation = {
          Title: title,
          Description: description,
          PrimaryFile: name as any,
          SecondaryFile: nameSecondary,
          TertiaryFile: nameTertiary,
        };
        setUploadSnackbarOpen(true);
        const res = await usePostStory(story, socialId.value, token);
        console.log(res);
        if (res) {
          router.push("/story/" + res.Id);
        } else {
          router.push("/profile/@" + username.value);
        }
      
    }
  };
  useEffect(() => {
    if (refresh) {
      sessionStorage.setItem("refresh", "false");
    }
  }, [uploadStory]);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setUploadSnackbarOpen(false);
  };

  const onFilesChanged = (files) => {
    if (files.length === 0) {
      return;
    }

    const url = URL.createObjectURL(files[files.length - 1]);
    setCropperImageUrl(url);

    if (deletedFile === true) {
      setDeletedFile(false);
    } else {
      setCropperActive(true);
    }
  };

  const onCropperInitialized = (cropperInstance) => {
    setCropper(cropperInstance);
  };

  const onCrop = () => {
    // Upload image and set image name
    const width = Math.round(cropper?.getData()?.width);
    const height = Math.round(cropper?.getData()?.height);
    cropper
      .getCroppedCanvas({
        fillColor: color,
      })
      .toBlob((blob) => {
        uploadImage(blob, width, height);
      }, "image/jpeg");

    // Show preview
    const dataUrl = cropper
      .getCroppedCanvas({
        fillColor: color,
      })
      .toDataURL("image/jpeg");
    if (croppedPrimary === null) {
      setCroppedPrimary(dataUrl);
    } else if (croppedSecondary === null) {
      setCroppedSecondary(dataUrl);
    } else if (croppedTertiary === null) {
      setCroppedTertiary(dataUrl);
    }
    setText(t("addmoreImages"));
    setCropperActive(false);
  };

  const onDiscard = () => {
    setMobileImgBlob(null);
    setMobileImg("");

    console.log(mobileImgBlob);
    console.log(mobilePreviewImageRef);

    setDeletedFile(true);
  };


  useEffect(() => {}, [onDiscard])

  const uploadImage = async (blob, width: number, height: number) => {
    return refreshToken()
      .then(() =>
        fetch(`${apiBaseUrl}/api/images?w=${width}&h=${height}`, {
          method: "POST",
          headers: {
            "Content-Type": "image/jpeg",
            Authorization: `Bearer ${token}`,
          },
          body: blob,
        })
      )
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
      });
  };

  const onMobileUpload = (event) => {
    if (isNullOrUndefined(event?.target?.files[0])) {
      return;
    }

    setMobileImgBlob(new Blob(event?.target?.files));
    const fr = new FileReader();
    fr.onload = function () {
      setMobileImg(fr.result.toString());
    };
    fr.readAsDataURL(event.target.files[0]);
  };

  return (
    <Main navBarItems={navBarItems}>
      <>
      <div className={s.fullContainer}>
        <div className={s.mainGrid}>
          <div className={s.form}>
            <StoryForm
              title={title}
              setTitle={setTitle}
              setDescription={setDescription}
            />
          </div>  
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              {!mobileImg && (
                <div>
                  <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={onMobileUpload}
              />
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
                  {t("story:selectImage")}
                </ArtButton>
                
              </label>
                </div>
              )}
             <ArtButton
              className={`${!title || !mobileImg || !mobileImgBlob ? s.disabledButton : s.uploadButton}`}
              rounded
              disabled={!title || !mobileImg || !mobileImgBlob}
              onClick={() => {
                uploadStory();
                trackGoogleAnalytics(
                  ActionType.UPLOAD_IMAGE_CONFIRM,
                  CategoryType.INTERACTIVE
                );
              }}
            >
              {t("story:publish")}
            </ArtButton>


              </div>
              <div>
   
            </div>
            <WarningMessage />
          <Snackbar
            open={uploadSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              variant="filled"
              severity="success"
            >
              {t("story:storyUploadedSuccessfully")}
            </Alert>
          </Snackbar>
        </div>
        <div style={{margin: "20px"}}>
          {mobileImg === "" ? (
            <div>
              <span>{t("story:previewText")}</span>
                </div>
                  ) : (
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <img
                    className={s.mobilePreview}
                    src={mobileImg}
                    ref={mobilePreviewImageRef}
                    alt="mobile image"
                  ></img>
                  <ArtButton rounded className={s.discardbutton} onClick={onDiscard}>X</ArtButton>
                  </div>
                )}
        </div>
        </div>
      </>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "header",
        "footer",
        "upload",
        "support",
        "common",
        "plans",
        "story",
      ])),
    },
    revalidate: 60,
  };
}