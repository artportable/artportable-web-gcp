import React from 'react'
import { useTranslation } from 'next-i18next'
import CloseIcon from "@mui/icons-material/Close";
import Button from "../Button/Button";
import {
  Dialog,
  DialogContent,
} from "@material-ui/core";
import {
  useRedirectToLoginIfNotLoggedIn,
  useRedirectToRegisterIfNotLoggedIn,
} from "../../hooks/useRedirectToLoginIfNotLoggedIn";

export default function LoginDialog({ loginDialogOpen, handleCloseLoginDialog }) {
  const { t } = useTranslation('discover');
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const redirectIfNotRegistered = useRedirectToRegisterIfNotLoggedIn();

  return (
    <Dialog open={loginDialogOpen} onClose={handleCloseLoginDialog}>
      <DialogContent>
        <div
          style={{
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Button
            onClick={handleCloseLoginDialog}
            endIcon={<CloseIcon />}
            style={{
              position: "absolute",
              top: "0px",
              right: "10px",
              marginBottom: "20px",
              padding: "20px",
              fontSize: "14px",
              color: "black",
              fontWeight: "400",
            }}
          >
            {t("discover:close")}
          </Button>
          <div style={{ marginTop: "50px" }}>
            <div style={{ fontWeight: "500" }}>
              {t("discover:loggedLike")}
            </div>
            <div style={{ marginTop: "30px", fontWeight: "500" }}>
              <Button
                onClick={redirectIfNotRegistered}
                style={{
                  color: "black",
                  backgroundColor: "#FFDA7A",
                  width: "212px",
                  height: "44px",
                  borderRadius: "20px",
                }}
              >
                {t("discover:createAccount")}
              </Button>
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button
                onClick={redirectIfNotLoggedIn}
                style={{
                  color: "black",
                  backgroundColor: "transparent",
                  width: "212px",
                  height: "44px",
                  borderRadius: "20px",
                  border: "1px solid",
                  marginBottom: "40px",
                }}
              >
                {t("discover:logIn")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
