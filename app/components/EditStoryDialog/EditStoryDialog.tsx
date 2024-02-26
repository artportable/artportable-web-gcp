import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "../Button/Button";
import DeleteArtworkWarningDialog from "../DeleteArtworkWarningDialog/DeleteArtworkWarningDialog";
import { styles } from "./editStoryDialog.css";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { capitalizeFirst } from "../../utils/util";
import { TokenContext } from "../../contexts/token-context";
import { UserContext } from "../../contexts/user-context";
import useRefreshToken from "../../hooks/useRefreshToken";
import { Story } from "../../models/Story";
import { useRouter } from "next/router";

interface EditStoryProps {
  story: Story;
  open: any;
  onClose: any;
}

export default function EditStoryDialog({
  story,
  open,
  onClose,
}: EditStoryProps) {
  const { t } = useTranslation(["story", "common"]);
  const s = styles();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { refreshToken } = useRefreshToken();
  const router = useRouter();

  const [storyTitle, setStoryTitle] = useState("");
  const [storyDescription, setArtworkDescription] = useState("");

  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);

  const { username, socialId } = useContext(UserContext);
  const token = useContext(TokenContext);

  useEffect(() => {
    if (story) {
      setStoryTitle(story.Title);
      setArtworkDescription(story.Description);
    }
  }, [story]);

  const onDeleteAlertDialogClose = (confirmedDelete: boolean) => {
    if (confirmedDelete) {
      onClickDeleteConfirm(story.Id);
    }

    setDeleteAlertDialogOpen(false);
  };

  const onClickDeleteConfirm = (id: string) => {
    if (username.value && id && id.trim().length > 0) {
      onClose(
        refreshToken()
          .then(() =>
            fetch(
              `${apiBaseUrl}/api/stories/${id}?myUsername=${username.value}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          )
          .then(() => router.push(`/profile/@${story.Username}`))
      );
    }
  };

  const onConfirmClick = () => {
    if (
      username.value &&
      story.Id &&
      story.Id.trim().length > 0 &&
      storyTitle
    ) {
      onClose(
        refreshToken().then(() =>
          fetch(
            `${apiBaseUrl}/api/stories/${story.Id}?mySocialId=${socialId.value}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                Title: storyTitle,
                Description: storyDescription,
                PrimaryFile: story.PrimaryFile?.Name,
                SecondaryFile: story.SecondaryFile?.Name,
                TertiaryFile: story.TertiaryFile?.Name,
              }),
            }
          )
        )
      );
    }
  };

  const onCancel = () => {
    onClose();
    setStoryTitle(story?.Title);
    setArtworkDescription(story?.Description);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="edit-story-dialog">{`${t("story:editStory")}: ${
        story?.Title
      }`}</DialogTitle>
      <DialogContent>
        <form className={s.form}>
          <TextField
            fullWidth
            error={storyTitle ? false : true}
            label={t("story:storyTitle")}
            required
            placeholder={t("storyTitle")}
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
          ></TextField>
          <TextField
            fullWidth
            label={t("storyDescription")}
            placeholder={t("storyDescription")}
            multiline
            value={storyDescription}
            onChange={(e) => setArtworkDescription(e.target.value)}
          ></TextField>
        </form>
        <div className={s.deleteContainer}>
          <Typography>{t("deleteStory")}</Typography>
          <IconButton
            aria-label="delete"
            onClick={() => setDeleteAlertDialogOpen(true)}
          >
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="primary"
          disableElevation
          rounded
          onClick={onCancel}
        >
          {capitalizeFirst(t("common:words.cancel"))}
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          rounded
          onClick={onConfirmClick}
        >
          {capitalizeFirst(t("common:words.save"))}
        </Button>
      </DialogActions>
      <DeleteArtworkWarningDialog
        open={deleteAlertDialogOpen}
        onClose={onDeleteAlertDialogClose}
        isArtwork={false}
      />
    </Dialog>
  );
}
