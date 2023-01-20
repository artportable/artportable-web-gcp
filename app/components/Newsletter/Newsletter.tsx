import * as React from "react";
import { Button, Typography } from "@material-ui/core";
import { FormInputText } from "../FormComponents/FormInputText";
import Dialog from "@mui/material/Dialog";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { styles } from "./newsletter.css";
import { useRef, useState } from "react";

interface IFormInput {
  textValue: string;
}

const defaultValues = {
  textValue: "",
};

export default function Newsletter() {
  const s = styles();
  const { t } = useTranslation(["feed"]);
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { register, handleSubmit, reset, control, setValue, watch } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputRef = useRef(null);

  const subscribeUser = async (e) => {
    e.preventDefault();
    // this is where your mailchimp request is made
    const res = await fetch("/api/subscribeUser", {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
        className={s.newsletterMenuButton}
      >
        Prenumerera på vårt nyhetsbrev
      </Button>
      <div className={s.newsletterDesktop}>
        <Dialog
          open={open}
          onClose={handleClose}
          className={s.newsletterContainer}
        >
          <div className={s.imageBox}>
            <img
              src="newsletter.png"
              alt="newsletter_image"
              className={s.newsletterImg}
            />
          </div>
          <div>
            <Typography variant="h1" className={s.newsletterHeader}>
              Prenumerera på vårt nyhetsbrev
            </Typography>
            <Typography variant="h6" className={s.newsletterText}>
              Anmäl dig här för att ta del av våra härliga och inspirerande
              nyhetsbrev. Uppdatera dig om Artportables senaste konstnärer.
            </Typography>
            <form onSubmit={subscribeUser}>
              <label htmlFor="email-input" className={s.newsletterLabel}>
                E-postadress
              </label>{" "}
              <br />
              <input
                type="email"
                id="email-input"
                name="email"
                ref={inputRef}
                required
                autoCapitalize="off"
                autoCorrect="off"
                className={s.newsletterTextField}
                placeholder="info@artportable.com"
              />
              <div className={s.newsletterActions}>
                <Button
                  onClick={handleClose}
                  variant={"contained"}
                  className={s.newsletterButton}
                >
                  {" "}
                  Stäng{" "}
                </Button>
                <Button
                  onClick={handleClose}
                  type="submit"
                  variant={"contained"}
                  className={s.newsletterButton}
                >
                  {" "}
                  Prenumerera{" "}
                </Button>
              </div>
            </form>
            <Typography variant="h6" className={s.newsletterTextBottom}>
              Du kan när som helst avregistrera dig från vårt nyhetsbrev. Se vår
              integritetspolicy för att se hur vi vårdar dina uppgifter.
            </Typography>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
