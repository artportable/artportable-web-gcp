import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "../Button/Button";
import DeleteArtworkWarningDialog from "../DeleteArtworkWarningDialog/DeleteArtworkWarningDialog";
import { styles } from "./editArtworkDialog.css";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { capitalizeFirst } from "../../utils/util";
import { TokenContext } from "../../contexts/token-context";
import { UserContext } from "../../contexts/user-context";
import useRefreshToken from "../../hooks/useRefreshToken";

export default function EditArtworkDialog({ artwork, open, onClose }) {
  const { t } = useTranslation(["art", "common"]);
  const s = styles();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { refreshToken } = useRefreshToken();

  const [artworkName, setArtworkName] = useState("");
  const [artworkDescription, setArtworkDescription] = useState("");
  const [artworkPrice, setArtworkPrice] = useState("");
  const [soldOutChecked, setSoldOutChecked] = useState(false);
  const [multipleSizesChecked, setMultipleSizesChecked] = useState(false);
  const [artworkWidth, setArtworkWidth] = useState("");
  const [artworkHeight, setArtworkHeight] = useState("");
  const [artworkDepth, setArtworkDepth] = useState("");
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);
  const [currency, setArtworkCurrency] = useState<{ currency: string }>();

  const { username, socialId } = useContext(UserContext);
  const token = useContext(TokenContext);

  const handleCurrencyChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setArtworkCurrency({ currency: (event.target.value as string) || "SEK" });
  };

  useEffect(() => {
    if (artwork) {
      setArtworkName(artwork.Title);
      setArtworkDescription(artwork.Description);
      setArtworkPrice(artwork.Price);
      setSoldOutChecked(artwork.SoldOut);
      setMultipleSizesChecked(artwork.MultipleSizes);
      setArtworkWidth(artwork.Width);
      setArtworkHeight(artwork.Height);
      setArtworkDepth(artwork.Depth);
      setArtworkCurrency(artwork.Currency);
    }
  }, [artwork]);

  const onDeleteAlertDialogClose = (confirmedDelete: boolean) => {
    if (confirmedDelete) {
      onClickDeleteConfirm(artwork.Id);
    }

    setDeleteAlertDialogOpen(false);
  };

  const onClickDeleteConfirm = (id: string) => {
    if (username.value && id && id.trim().length > 0) {
      onClose(
        refreshToken().then(() =>
          fetch(
            `${apiBaseUrl}/api/artworks/${id}?myUsername=${username.value}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );
    }
  };

  const onConfirmClick = () => {
    if (
      username.value &&
      artwork.Id &&
      artwork.Id.trim().length > 0 &&
      artworkName &&
      ((artworkWidth &&
        artworkWidth !== "0" &&
        artworkHeight &&
        artworkHeight !== "0") ||
        multipleSizesChecked)
    ) {
      onClose(
        refreshToken().then(() =>
          fetch(
            `${apiBaseUrl}/api/artworks/${artwork.Id}?mySocialId=${socialId.value}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                Title: artworkName,
                Description: artworkDescription,
                Price: parseInt(artworkPrice, 10),
                SoldOut: soldOutChecked,
                MultipleSizes: multipleSizesChecked,
                Width: parseInt(artworkWidth, 10),
                Height: parseInt(artworkHeight, 10),
                Depth: parseInt(artworkDepth, 10),
                PrimaryFile: artwork.PrimaryFile?.Name,
                SecondaryFile: artwork.SecondaryFile?.Name,
                TertiaryFile: artwork.TertiaryFile?.Name,
                Tags: artwork.Tags,
                Currency: currency?.currency ? currency.currency : "SEK",
              }),
            }
          )
        )
      );
    }
  };

  const onCancel = () => {
    onClose();
    setArtworkName(artwork.Title);
    setArtworkDescription(artwork.Description);
    setArtworkPrice(artwork.Price);
    setSoldOutChecked(artwork.SoldOut);
    setMultipleSizesChecked(artwork.MultipleSizes);
    setArtworkWidth(artwork.Width);
    setArtworkHeight(artwork.Height);
    setArtworkDepth(artwork.Depth);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="edit-artwork-dialog">{`${t("editArtwork")}: ${
        artwork?.Title
      }`}</DialogTitle>
      <DialogContent>
        <form className={s.form}>
          <TextField
            fullWidth
            error={artworkName ? false : true}
            label={t("artworkTitle")}
            required
            placeholder={t("artworkTitle")}
            value={artworkName}
            onChange={(e) => setArtworkName(e.target.value)}
          ></TextField>
          <TextField
            fullWidth
            label={t("artworkDescription")}
            placeholder={t("artworkDescription")}
            multiline
            rows={5}
            value={artworkDescription}
            onChange={(e) => setArtworkDescription(e.target.value)}
          ></TextField>
          <TextField
            fullWidth
            label={t("artworkPrice")}
            placeholder={t("artworkPrice")}
            value={artworkPrice}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <InputLabel shrink htmlFor="currency-select">
                    {t("currency")}
                  </InputLabel>
                  <Select
                    value={currency ? currency.currency : "SEK"}
                    onChange={handleCurrencyChange}
                    inputProps={{
                      name: "currency",
                      id: "currency-select",
                    }}
                  >
                    <MenuItem value="SEK">SEK</MenuItem>
                    <MenuItem value="NOK">NOK</MenuItem>
                    <MenuItem value="DKK">DKK</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Select>
                </InputAdornment>
              ),
              inputProps: {
                step: 100,
              },
            }}
            onChange={(e) => setArtworkPrice(e.target.value)}
          ></TextField>

          <FormControlLabel
            control={
              <Checkbox
                checked={soldOutChecked}
                onChange={(event) => setSoldOutChecked(event.target.checked)}
              />
            }
            label={t("common:words.soldOut")}
          />
          {!multipleSizesChecked ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("artworkWidth")}
                  placeholder={t("artworkWidth")}
                  error={artworkWidth && artworkWidth !== "0" ? false : true}
                  required
                  value={artworkWidth}
                  type="number"
                  onChange={(e) => setArtworkWidth(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  style={{ display: "flex" }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("artworkHeight")}
                  placeholder={t("artworkHeight")}
                  error={artworkHeight && artworkHeight !== "0" ? false : true}
                  required
                  value={artworkHeight}
                  type="number"
                  onChange={(e) => setArtworkHeight(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  style={{ display: "flex" }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("artworkDepth")}
                  placeholder={t("artworkDepth")}
                  value={artworkDepth}
                  type="number"
                  onChange={(e) => setArtworkDepth(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  style={{ display: "flex" }}
                />
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          <Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={multipleSizesChecked}
                  onChange={(event) =>
                    setMultipleSizesChecked(event.target.checked)
                  }
                />
              }
              label={t("common:words.multipleSizes")}
            />
          </Grid>
        </form>
        <div className={s.deleteContainer}>
          <Typography>{t("deleteArtwork")}</Typography>
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
        isArtwork={true}
      />
    </Dialog>
  );
}
