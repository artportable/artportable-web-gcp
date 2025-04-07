import React, { useState, useRef, useEffect, useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Main from "../app/components/Main/Main";
import UploadForm from "../app/components/UploadForm/UploadForm";
import { useGetTags, usePostArtwork } from "../app/hooks/dataFetching/Artworks";
import styles from "../styles/upload.css";
import { DropzoneArea } from "material-ui-dropzone";
import ArtButton from "../app/components/Button/Button";
import { useTranslation } from "next-i18next";
import { ArtworkForCreation } from "../app/models/Artwork";
import { Cropper } from "react-cropper";
import clsx from "clsx";
import CropperOptions from "../app/components/CropperOptions/CropperOptions";
import "cropperjs/dist/cropper.css";
import { Paper, Snackbar, Typography } from "@material-ui/core";
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
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import ZendeskForm from "../app/components/ZendeskFormMenu/ZendeskFormMenu";
import Link from "next/link";
import { sendInformFollowersEmail } from "../app/utils/emailUtil";
import InfoMessage from "../app/components/WarningMessage/InfoMessage";

export default function UploadArtworkPage({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["upload"]);
  const router = useRouter();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("xs"));

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const {
    username,
    socialId,
    isSignedIn,
    membership,
    email: userEmail,
    given_name,
    family_name,
  } = useContext(UserContext);
  const tags = useGetTags();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("SEK");
  const [soldOutChecked, setSoldOutChecked] = useState(false);
  const [multipleSizesChecked, setMultipleSizesChecked] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
  const [signedByArtist, setSignedByArtist] = useState("");
  const [frameIncluded, setFrameIncluded] = useState(false);
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

  const [mobileImg, setMobileImg] = useState("");
  const [mobileImgBlob, setMobileImgBlob] = useState(null);
  const mobilePreviewImageRef = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const [color, setColor] = useState("#fff");
  const [text, setText] = useState<string>(t("dragandDropOrClick"));

  const cropperRef = useRef(null);

  // const followersData = useGetFollowers(data?.Username, followersOpen);
  // console.log('followersData', followersData);
  // name: "Jimmy"
  // profilePicture: "3653ade3-9e5d-4efa-becb-08569d760c6b.jpg"
  // surname: "Lord"
  // username: "jimpa"

  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    if (!isSignedIn.value) {
      router.push("/");
    }

    if (cropper !== undefined) {
      cropper.setDragMode("move");
    }
  });

  // Which section user is on: 1 = Only upload image section visible, 2 = Fill in details about the artwork and publish
  const [progress, setProgress] = useState(1);
  const [showPublishError, setShowPublishError] = useState(false);
  const formDetailsRef = useRef(null);

  useEffect(() => {
    if (croppedPrimary) {
      setProgress(2);
    }
  }, [croppedPrimary]);

  const uploadArtwork = async () => {
    if (isDesktop) {
      if (title && ((width && height) || multipleSizesChecked)) {
        const artwork: ArtworkForCreation = {
          Title: title,
          Description: description,
          Price: price,
          Currency: currency,
          SoldOut: soldOutChecked,
          MultipleSizes: multipleSizesChecked,
          Width: width,
          Height: height,
          Depth: depth,
          FrameIncluded: frameIncluded,
          SignedByArtist: signedByArtist,
          Tags: selectedTags,
          PrimaryFile: namePrimary,
          SecondaryFile: nameSecondary,
          TertiaryFile: nameTertiary,
        };
        setRefresh(true);
        setUploadSnackbarOpen(true);
        const res = await usePostArtwork(artwork, socialId.value, token);

        if (res && res.Id) {
          sendInformFollowersEmail(token, res, username.value, userEmail.value);
          router.push("/art/" + res.Id);
        }
      }
    } else {
      const name = await uploadImage(
        mobileImgBlob,
        mobilePreviewImageRef.current.naturalWidth,
        mobilePreviewImageRef.current.naturalHeight
      );

      if (
        name !== null &&
        title &&
        ((width && height) || multipleSizesChecked)
      ) {
        const artwork: ArtworkForCreation = {
          Title: title,
          Description: description,
          Price: price,
          Currency: currency,
          SoldOut: soldOutChecked,
          MultipleSizes: multipleSizesChecked,
          Width: width,
          Height: height,
          Depth: depth,
          FrameIncluded: frameIncluded,
          SignedByArtist: signedByArtist,
          Tags: selectedTags,
          PrimaryFile: name as any,
          SecondaryFile: nameSecondary,
          TertiaryFile: nameTertiary,
        };
        setUploadSnackbarOpen(true);
        const res = await usePostArtwork(artwork, socialId.value, token);

        if (res && res.Id) {
          sendInformFollowersEmail(token, res, username.value, userEmail.value);
          router.push("/art/" + res.Id);
        }
      }
    }
  };
  useEffect(() => {
    if (refresh) {
      sessionStorage.setItem("refresh", "false");
    }
  }, [uploadArtwork]);

  const informFollowers = (res) => {
    fetch("/api/informFollowers", res)
      .then((result) => {
        console.log("result", result);
      })
      .catch((err) => {
        console.log("err", err);
      });
    // fetch("/api/informFollowers", {
    //   body: JSON.stringify({
    //     artwork: res,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });
  };

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
    setCropperActive(false);
    const uploadedImgButtons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll(".MuiDropzonePreviewList-removeButton");

    //Click the last button to remove image from dropzone component
    uploadedImgButtons[uploadedImgButtons.length - 1].click();
    setDeletedFile(true);
  };

  const [userData, setUserData] = useState(null);
  const [userCreated, setUserCreated] = useState(new Date());
  const limitDate = new Date("2023-02-17");
  const [userTotalArtworks, setUserTotalArtworks] = useState(null);
  const [userCreatedDate, setUserCreatedDate] = useState(new Date());
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${apiBaseUrl}/api/user/${username.value}`);
      const responseSummary = await fetch(
        `${apiBaseUrl}/api/profile/${username.value}/summary`
      );

      const data = await response.json();
      const dataSummary = await responseSummary.json();

      setUserData(data);
      setUserCreated(data.Created);
      setUserTotalArtworks(dataSummary.Artworks);
      setUserCreatedDate(new Date(data.Created));
    }
    fetchUserData();
  }, [userCreated, userTotalArtworks]);

  const artworkLimitReachedStarter =
    userTotalArtworks >= 3 && membership.value === 1;

  const artworkLimitReached =
    userTotalArtworks >= 10 &&
    membership.value === 2 &&
    userCreatedDate > limitDate;

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

  const requiredDetailsCompleted =
    title && ((width && height) || multipleSizesChecked) ? true : false;

  const publishButtonDisabled =
    (!croppedPrimary && mobileImg === "") || !requiredDetailsCompleted;

  const maximumImagesUploaded =
    croppedPrimary && croppedSecondary && croppedTertiary ? true : false;

  if (artworkLimitReached || artworkLimitReachedStarter) {
    return (
      <Main navBarItems={navBarItems}>
        {" "}
        <div className={s.flexPaper}>
          <Paper className={s.paperLeft} elevation={1}>
            <Typography className={clsx(s.textBlock, s.textBlockWidth)}>
              {t("limitArtwork")}
              <a href="/upgrade" target="_self">
                {t("clickHere")}
              </a>

              {t("uploadUnlimited")}
            </Typography>
            <Typography className={clsx(s.textBlock, s.textBlockWidth)}>
              {t("yourWelcome")}
            </Typography>
            <div className={s.iconTextFlex}>
              <MailOutlineIcon className={s.icon} />
              <Typography className={s.linkText}>
                <a href="mailto:hello@artportable.com">hello@artportable.com</a>
              </Typography>
            </div>
            <div className={s.iconTextFlex}>
              <PhoneIphoneIcon className={s.icon} />
              <Typography className={s.linkText}>
                <a href="tel:+46855766120">08 - 557 661 20</a>
              </Typography>
            </div>
            <div className={s.textBlock}>
              <Typography className={s.typoBold}>
                {t("openingHours")}
              </Typography>
              <Typography>{t("8-17")}</Typography>
              <Typography>{t("deviating")}</Typography>
            </div>
            <div className={s.zendeskForm}>
              <ZendeskForm />
            </div>
          </Paper>
          <Paper className={s.paperRight} elevation={1}>
            <div>
              <img
                className={s.logo}
                src="/Artportable_Logotyp_Black.svg"
                alt="Logo Artportable"
              />
              <Typography className={s.bold}>Artportable AB</Typography>
              <Typography>559113-1171</Typography>
              <div className={s.textBlockRight}>
                <Typography>Åsögatan 176</Typography>
                <Typography>116 32 Stockholm</Typography>
              </div>
              <Typography>
                Tel: <a href="tel:+4685576612">08 - 557 661 20</a>
              </Typography>
            </div>
          </Paper>
        </div>
      </Main>
    );
  }

  return (
    <Main navBarItems={navBarItems}>
      <>
        {" "}
        <div className={s.mainGrid}>
          <div className={s.clampedContainer}>
            {isDesktop ? (
              <>
                {!maximumImagesUploaded ? (
                  <div className={s.uploadBox}>
                    <DropzoneArea
                      classes={{
                        root: `${s.dropzone} ${cropperActive ? s.hide : ""}`,
                      }}
                      acceptedFiles={["image/*"]}
                      dropzoneText={text}
                      onChange={onFilesChanged}
                      showPreviews={false}
                      showPreviewsInDropzone={true}
                      filesLimit={3}
                      maxFileSize={2000000000}
                    />
                  </div>
                ) : (
                  <Typography>{t("allImagesUploaded")}</Typography>
                )}
                <div className={s.cropperBox}>
                  <Cropper
                    className={clsx(s.cropper, !cropperActive && s.hide)}
                    src={cropperImageUrl}
                    onInitialized={onCropperInitialized}
                    initialAspectRatio={1}
                    autoCropArea={1}
                    // preview={`.${s.cropperPreview}`}
                    ref={cropperRef}
                    background={true}
                    // style={{ backgroundColor: color}}
                  />
                </div>

                {/* <div className={s.backgroundColorFlex}>
          <div className={s.pickColor}  style={{ backgroundColor: '#ffffff'}} onClick={() => setColor('#ffffff')} />
          <div className={s.pickColor} style={{ backgroundColor: '#FDF9F7'}} onClick={() => setColor('#FDF9F7')} />
          <div className={s.pickColor} style={{ backgroundColor: '#FAF3EE'}} onClick={() => setColor('#FAF3EE')} /> */}
                {/* <div className={s.pickColor} style={{ backgroundColor: '#C67777'}} onClick={() => setColor('#C67777')} />
          <div className={s.pickColor} style={{ backgroundColor: '#A35D5D'}} onClick={() => setColor('#A35D5D')} />
          <div className={s.pickColor} style={{ backgroundColor: '#01C281'}} onClick={() => setColor('#01C281')} /> */}
                {/* <div className={s.pickColor} style={{ backgroundColor: '#000000'}} onClick={() => setColor('#000000')} />
          </div> */}
                <CropperOptions
                  show={cropperActive}
                  cropper={cropper}
                  onCrop={onCrop}
                  onDiscard={onDiscard}
                ></CropperOptions>
                {cropperActive && (
                  <Typography className={s.instructionsTypo}>
                    {t("doneCropping")}
                  </Typography>
                )}
              </>
            ) : (
              <div>
                <div>
                  {mobileImg === "" ? (
                    <div className={clsx(s.mobilePreview, s.noImgPreview)}>
                      <span>{t("previewText")}</span>
                    </div>
                  ) : (
                    <img
                      className={s.mobilePreview}
                      src={mobileImg}
                      ref={mobilePreviewImageRef}
                      alt="mobile image"
                    ></img>
                  )}
                </div>
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
                    {t("selectImage")}
                  </ArtButton>
                </label>
              </div>
            )}

            <div className={s.previewsContainer}>
              {croppedPrimary && (
                <div className={s.previewItem}>
                  <img src={croppedPrimary} alt="primary image" />
                </div>
              )}
              {croppedSecondary && (
                <div className={s.previewItem}>
                  <img src={croppedSecondary} alt="secondary image" />
                </div>
              )}
              {croppedTertiary && (
                <div className={s.previewItem}>
                  <img src={croppedTertiary} alt="tertiary image" />
                </div>
              )}
              {!croppedTertiary && cropperActive && (
                <div className={s.previewItem}>
                  <div className={s.cropperPreview}></div>
                </div>
              )}
            </div>
          </div>
          {/* clampedContainer */}

          {/* After uploading an image: */}
          {progress > 1 && (
            <div className={s.form} ref={formDetailsRef}>
              {tags.isLoading && <div>loading...</div>}
              {tags.isError && <div>error...</div>}
              {tags.data && !tags.isLoading && !tags.isError && (
                <UploadForm
                  title={title}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setPrice={setPrice}
                  currency={currency}
                  setCurrency={setCurrency}
                  soldOutChecked={soldOutChecked}
                  setSoldOutChecked={setSoldOutChecked}
                  multipleSizesChecked={multipleSizesChecked}
                  setMultipleSizesChecked={setMultipleSizesChecked}
                  width={width}
                  signedByArtist={signedByArtist}
                  setSignedByArtist={setSignedByArtist}
                  frameIncluded={frameIncluded}
                  setFrameIncluded={setFrameIncluded}
                  setWidth={setWidth}
                  height={height}
                  setHeight={setHeight}
                  setDepth={setDepth}
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
                  tags={tags.data}
                ></UploadForm>
              )}
            </div>
          )}

          {progress > 1 && (
            <div className={s.clampedContainer}>
              {/* Don't show error message until user has clicked the publish button at least once. */}
              <Typography className={s.publishErrorMessage}>
                {showPublishError && !requiredDetailsCompleted
                  ? t("fieldsMissing")
                  : " "}
              </Typography>
              <ArtButton
                className={`${
                  publishButtonDisabled ? s.disabledButton : s.uploadButton
                }`}
                rounded
                onClick={
                  !publishButtonDisabled
                    ? () => {
                        uploadArtwork();
                        trackGoogleAnalytics(
                          ActionType.UPLOAD_IMAGE_CONFIRM,
                          CategoryType.INTERACTIVE
                        );
                      }
                    : () => {
                        setShowPublishError(true);
                      }
                }
              >
                {t("publish")}
              </ArtButton>
            </div>
          )}
          <div className={s.clampedContainer}>
            {/* Show warning message regardless of what "progress" user is on. */}
            <WarningMessage />
            <InfoMessage />
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
                {t("artworkUploadedSuccessfully")}
              </Alert>
            </Snackbar>
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
        "tags",
        "support",
        "common",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}
