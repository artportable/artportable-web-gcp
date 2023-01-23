import { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "next-i18next";
import ZendeskFormMenu from "../ZendeskFormMenu/ZendeskFormMenu";
import CloseIcon from "@material-ui/icons/Close";
import { UserContext } from "../../contexts/user-context";
import { zapierArticleInterest } from "../../utils/zapierLead";

import { styles } from "./articleLead.css";
import Button from "../Button/Button";

interface Props {
  open: any;
  onClose(): any;
  numberExists: any;
}

const checkoutLink = "https://buy.stripe.com/7sI6oR6Cigwl5OMdRG";

export default function DialogMonthlyUser(props: Props) {
  const s = styles();
  const { t } = useTranslation(["articles"]);
  const [sentInterest, setSentInterest] = useState(false);
  const { email, family_name, given_name, phone } = useContext(UserContext);
  const [phoneNumber, setPhonenNumber] = useState("");

  const redirectToCheckout = () => {
    window.location.href = checkoutLink;
  };

  const submit = () => {
    setSentInterest(true);
    getPhoneNumber();
    zapierArticleInterest({
      email:
        email.value +
        " " +
        given_name.value +
        " " +
        family_name.value +
        " " +
        phone.value +
        " " +
        "Article Interest",
    });
  };
  const getPhoneNumber = () => {
    if (!phone.value || phone.value == undefined) {
      phone.value = phoneNumber;
    }
  };
  const onCloseClick = () => {
    props.onClose();
    setSentInterest(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={onCloseClick}
        className={s.dialog}
        aria-labelledby={t("articleAbout")}
        aria-describedby={t("getInterviewed")}
      >
        {sentInterest ? (
          <>
            <IconButton
              aria-label="close"
              className={s.closeButton}
              onClick={onCloseClick}
            >
              <CloseIcon />
            </IconButton>
            <img
              src="/Artportable_Logotyp_Black.svg"
              alt="Logo Artportable"
              className={s.logo}
            />
            <DialogTitle id="dialog-title" className={s.thanksText}>
              {t("thanks")}
            </DialogTitle>
            <DialogContent>
              <div className={s.dialogContent}>
                <Typography className={s.inShort}>{t("inShort")}</Typography>
                <Button
                  className={s.button}
                  variant="contained"
                  color="primary"
                  onClick={onCloseClick}
                >
                  {t("close")}
                </Button>
              </div>
            </DialogContent>
          </>
        ) : (
          <>
            <IconButton
              aria-label="close"
              className={s.closeButton}
              onClick={onCloseClick}
            >
              <CloseIcon />
            </IconButton>

            <img
              src="/Artportable_Logotyp_Black.svg"
              alt="Logo Artportable"
              className={s.logo}
            />
            <DialogTitle id="dialog-title" className={s.title}>
              {t("sendPurchase")}
            </DialogTitle>
            <DialogContent>
              <div className={s.dialogContent}>
                <div>
                  <Typography variant="h2" className={s.textPortfolioPremium}>
                    {t("articleAbout")}
                  </Typography>
                  <Typography className={s.text}>
                    {t("getInterviewed")}
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={redirectToCheckout}
                >
                  {t("checkout")}
                </Button>
                <div className={s.imgDivSecondView}>
                  <img
                    src="/images/article_portfolio.png"
                    alt="Logo Artportable"
                    className={s.imagePortfolio}
                  />
                  <Typography className={s.imageText}>
                    {t("imageFromPortfolio")}
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={redirectToCheckout}
                >
                  {t("checkout")}
                </Button>
                <div className={s.phoneDiv}>
                  {!props.numberExists && (
                    <div className={s.textFieldDiv}>
                      <Typography className={s.textTextfield}>
                        {t("yourPhoneNumber")}
                      </Typography>
                      <TextField
                        className={s.textField}
                        fullWidth
                        placeholder={t("phoneNumber")}
                        value={phoneNumber}
                        required
                        variant="outlined"
                        onChange={(e) => setPhonenNumber(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <Button
                  className={s.button}
                  variant="contained"
                  color="primary"
                  onClick={submit}
                >
                  {t("send")}
                </Button>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}
