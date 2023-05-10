import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import { styles } from "./writePostsDialog.css"
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Box, DialogActions, Typography } from "@material-ui/core";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";
import { Textarea } from "react-activity-feed";
import CloseIcon from '@mui/icons-material/Close';

export default function WritePostsDialog({ 
    linkToProfile = true,
    userProfile,
    userProfilePicture,
    }) {

    const s = styles()
    const { t } = useTranslation(["feed"])
    const data = userProfile?.data;
    const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
    <>
        <Button
        className={s.writePostButton}
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
        >
        {t("writePost")}
        </Button>
        <div>
            <Dialog open={open} className={s.dialogContainer}>
                <DialogContent>
                    <div className={s.contentHeader}>
                        <div className={s.profileImageName}>
                              {linkToProfile ? (
                                <Link href={`/profile/@${data?.Username}`}>
                                  <a>
                                    <Avatar className={s.avatar}>
                                      {data?.ProfilePicture ? (
                                        <Avatar
                                          src={`${bucketUrl}${data?.ProfilePicture}`}
                                          alt="Profile picture"
                                          style={{ height: "40px", width: "40px" }}
                                        />
                                      ) : (
                                        <AccountCircleIcon
                                          color="secondary"
                                          className={s.noPictureIcon}
                                          style={{ fontSize: 48 }}
                                        />
                                      )}
                                    </Avatar>
                                  </a>
                                </Link>
                              ) : (
                                <Avatar className={s.avatar}>
                                  {userProfilePicture ? (
                                    <Avatar
                                      src={`${bucketUrl}${userProfilePicture}`}
                                      alt="Profile picture"
                                      style={{ height: "40px", width: "40px" }}
                                    />
                                  ) : (
                                    <AccountCircleIcon
                                      color="secondary"
                                      className={s.noPictureIcon}
                                      style={{ fontSize: 48 }}
                                    />
                                  )}
                                </Avatar>
                              )}
                              <Box fontWeight="fontWeightBold" marginTop={1}>
                                <Typography variant="h5" className={s.fullName}>
                                  {linkToProfile ? (
                                    <Link href={`/profile/@${data?.Username}`}>
                                      <a>
                                        {data?.Name} {data?.Surname && data?.Surname}
                                      </a>
                                    </Link>
                                  ) : (
                                    <span>
                                      {data?.Name} {data?.Surname && data?.Surname}
                                    </span>
                                  )}
                                </Typography>
                              </Box>
                            </div>
                        <Button
                          onClick={handleClose}
                          variant={"contained"}
                          className={s.closeButton}
                        >
                         <CloseIcon onClick={handleClose}/>
                        </Button>
                    </div>
                    <DialogActions className={s.actionsContainer}>
                        <Textarea
                        className={s.textareaContainer}
                        maxLength={2200}
                        placeholder={t("writePost")}/>
                        <div className={s.buttonPublish}>
                            <Button>{t("publishPost")}</Button>
                        </div>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
        </>
    )
}
