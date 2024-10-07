import { useContext, useState } from "react";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Popover from "@material-ui/core/Popover";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import { useTranslation } from "next-i18next";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import styles from "./profileIconButton.css";
import { UserContext } from "../../contexts/user-context";

const ProfileIconButton = ({ profilePicture = null }) => {
  const s = styles();
  const { t } = useTranslation("header");
  const { username } = useContext(UserContext);
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const open = Boolean(popoverAnchorEl);

  return (
    <>
      <IconButton
        color="primary"
        aria-label="account"
        onClick={(event) => setPopoverAnchorEl(event.currentTarget)}
      >
        <ProfileAvatar
          size={30}
          profilePicture={profilePicture}
        ></ProfileAvatar>
      </IconButton>
      <Popover
        open={open}
        anchorEl={popoverAnchorEl}
        onClose={() => setPopoverAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="Profile menu"
          size="large"
        >
          <Link href={`/profile/@${username.value}`} passHref>
            <Button
              className={
                "MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButtonGroup-grouped MuiButtonGroup-groupedVertical MuiButtonGroup-groupedOutlined MuiButtonGroup-groupedOutlinedVertical MuiButtonGroup-groupedOutlined MuiButton-outlinedSizeLarge MuiButton-sizeLarge"
              }
              href="/"
              startIcon={
                <ProfileAvatar
                  size={30}
                  profilePicture={profilePicture}
                ></ProfileAvatar>
              }
            >
              {t("profile")}
            </Button>
          </Link>
          <Button
            onClick={(_) => keycloak.logout()}
            startIcon={
              <ExitToAppIcon style={{ fontSize: 30 }} color="action" />
            }
          >
            {t("logout")}
          </Button>
        </ButtonGroup>
      </Popover>
    </>
  );
};

export default ProfileIconButton;
