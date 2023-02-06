import React, { useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import FormButton from "../FormComponents/FormButton";
import { styles } from "./newsletterCard.css";
import { inputStyles } from "../../../styles/FormStyles/FormInputText.css";

const Newsletter = () => {
  const s = styles();
  const iS = inputStyles();
  const { t } = useTranslation(["feed"]);
  const inputRef = useRef(null);

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("/api/subscribeUser", {
        body: JSON.stringify({
          email: inputRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.status === 201) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
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
        <div>
          <div className={s.newsletterHeader}>{t("subscribeNewsletter")}</div>
          <div className={s.newsletterText}>
            {t("artPortableNewsLetterRegisterToGetUpdates")}
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email-input" className={s.newsletterLabel}>
              {t("emailCapitalLetter")}
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
              placeholder="info@artportable.com"
              className={iS.TextField}
            />
            <FormButton type="submit"> {t("subscribe")} </FormButton>
          </form>
          {status === "success" && (
            <div className={s.newsletterTextBottom}>
              {t("subscriptionSuccess")}
            </div>
          )}
          {status === "error" && (
            <div className={s.newsletterTextBottom}>
              {t("subscriptionError")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
