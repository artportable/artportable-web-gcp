import * as React from "react";
import { FormInputText } from "../FormComponents/FormInputText";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { styles } from "./newsletterCard.css";
import { useRef, useState } from "react";
import FormButton from "../FormComponents/FormButton";

interface IFormInput {
  textValue: string;
}

const defaultValues = {
  textValue: "",
};

export default function Newsletter() {
  const s = styles();
  const { t } = useTranslation(["feed, header, common"]);
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { register, handleSubmit, reset, control, setValue, watch } = methods;
  const onSubmit = (data: IFormInput) => console.log(data);
  const [open, setOpen] = React.useState(false);
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
    <div className={s.divBackground}>
        <div className={s.newsletterContainer}>
          <div className={s.imageBox}>
            <img
              src="/newsletter.png"
              alt="newsletter_image"
              className={s.newsletterImg}
            />
          </div>
          <article>
            <div className={s.newsletterHeader}>
              {t('subscribeNewsletter')}
            </div>
            <div className={s.newsletterText}>
            {t('artPortableNewsLetterRegisterToGetUpdates')}
            </div>
            <form onSubmit={subscribeUser}>
              <label htmlFor="email-input" className={s.newsletterLabel}>
                {t('emailCapitalLetter')}
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
                <FormButton
                  onClick={() => console.log("You clicked the button")}
                  type="submit"
                >
                  {" "}
                  {t('subscribe')}{" "}
                </FormButton>
            </form>
            <div className={s.newsletterTextBottom}>
              {t('newsletterInfo')}
            </div>
          </article>
        </div>
      </div>
  )
}
