import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "../Button/Button";

import { useTranslation } from "next-i18next";
import { mutate } from "swr";
import clsx from "clsx";
import { styles } from "./editProfileDialog.css";
import { EditMyStudio } from "./EditMyStudio/EditMyStudio";
import { EditInspiredBy } from "./EditInspiredBy/EditInspiredBy";
import { EditEducation } from "./EditEducation/EditEducation";
import { EditExhibitions } from "./EditExhibitions/EditExhibitions";
import { EditSocials } from "./EditSocials/EditSocials";

import { v4 } from "uuid";
import {
  getUserProfileSummaryUri,
  getUserProfileUri,
} from "../../hooks/dataFetching/UserProfile";
import { TokenContext } from "../../contexts/token-context";
import { UserContext } from "../../contexts/user-context";
import { capitalizeFirst } from "../../utils/util";
import useRefreshToken from "../../hooks/useRefreshToken";
import { EditLocation } from "./EditLocation/EditLocation";

interface Profile {
  title: string;
  headline: string;
  location: string;
  about: string;
  studio: Studio;
  inspiredBy: string;
  educations: Education[];
  exhibitions: Exhibition[];
  socialMedia: Socials;
}

interface Studio {
  name: string;
  location: string;
}

export interface Education {
  from: number;
  to: number;
  name: string;
}

export interface Exhibition {
  from: Date;
  to: Date;
  name: string;
  place: string;
}

export interface Socials {
  instagram: string;
  facebook: string;
  linkedIn: string;
  dribbble: string;
  behance: string;
  website: string;
}

export default function EditProfileDialog({
  userProfile,
  isButton = true,
  isDotsButton = false,
  isMenuItem = false,
  closeMenu = () => {},
  buttonStyle = {},
}) {
  const s = styles();
  const { t } = useTranslation(["profile", "common"]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { username } = useContext(UserContext);
  const token = useContext(TokenContext);
  const { refreshToken } = useRefreshToken();
  const useLightStyle = userProfile?.ChosenColor === "#000000";

  const [openEdit, setOpenEdit] = useState(false);
  const [profile, setProfile] = useState<Profile>(
    populateProfileObject(userProfile)
  );

  const makeChanges = async (_) => {
    setOpenEdit(false);
    try {
      validate(profile);
      mutate(
        getUserProfileUri(username.value, null),
        { ...userProfile, ...createOriginalProfileObject(profile) },
        false
      );

      await refreshToken().then(() =>
        fetch(`${apiBaseUrl}/api/profile/${username.value}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        })
      );
      window.location.reload();
      mutate(getUserProfileSummaryUri(username.value));
    } catch (error) {}
  };

  const validate = (p) => {
    profile?.educations?.map((e) => {
      if (!e.from) {
        e.from = null;
      }
      if (!e.to) {
        e.to = null;
      }
    });

    profile?.exhibitions?.map((e) => {
      if (!e.from) {
        e.from = null;
      }
      if (!e.to) {
        e.to = null;
      }
    });
  };

  const cancel = (_) => {
    setProfile(populateProfileObject(userProfile));
    setOpenEdit(false);
  };

  useEffect(() => {
    setProfile(populateProfileObject(userProfile));
  }, [userProfile]);

  return (
    <>
      {isButton && (
        <div className={s.buttonPosition}>
          <Button
            className={clsx(s.editProfileButton, {
              [s.lightButton]: useLightStyle,
            })}
            rounded
            startIcon={<EditIcon className={s.editProfileIcon} />}
            onClick={() => setOpenEdit(true)}
          >
            <div> {t("editProfile")}</div>
          </Button>
        </div>
      )}
      {isDotsButton && (
        <MoreHorizIcon
          onClick={() => setOpenEdit(true)}
          style={{
            ...buttonStyle,
            color: useLightStyle ? "white" : "black",
          }}
        />
      )}
      {isMenuItem && (
        <MenuItem
          onClick={() => {
            closeMenu();
            setOpenEdit(true);
          }}
        >
          {t("editProfile")}
          <EditIcon />
        </MenuItem>
      )}

      <Dialog
        open={openEdit}
        onClose={cancel}
        maxWidth="md"
        aria-labelledby="artwork-modal-title"
        aria-describedby="artwork-modal-description"
      >
        <DialogTitle>{t("editProfile")}</DialogTitle>
        <DialogContent>
          <form className={s.form}>
            <div className={s.flexColumn}>
              <TextField
                label={t("title")}
                defaultValue={profile.title}
                onChange={(event) =>
                  setProfile({ ...profile, title: event.target.value })
                }
                inputProps={{ maxLength: 140 }}
              />

              {/*
              Headline now edited in ProfileNew.tsx
            */}
              <TextField
                label={t("headline")}
                defaultValue={profile.headline}
                multiline
                onChange={(event) =>
                  setProfile({ ...profile, headline: event.target.value })
                }
                inputProps={{ maxLength: 100 }}
              />

              <TextField
                label={t("location")}
                defaultValue={profile.location}
                onChange={(event) =>
                  setProfile({ ...profile, location: event.target.value })
                }
                inputProps={{ maxLength: 280 }}
              />

              <EditLocation
                profile={profile}
                setProfile={setProfile}
              ></EditLocation>

              <TextField
                label={t("aboutMe")}
                defaultValue={profile.about}
                multiline
                onChange={(event) =>
                  setProfile({ ...profile, about: event.target.value })
                }
              />
            </div>
            <div>
              <EditMyStudio
                profile={profile}
                setProfile={setProfile}
              ></EditMyStudio>
            </div>
            <div>
              <EditInspiredBy
                profile={profile}
                setProfile={setProfile}
              ></EditInspiredBy>
            </div>
            <div>
              <EditEducation
                profile={profile}
                setProfile={setProfile}
              ></EditEducation>
            </div>
            <div>
              <EditExhibitions
                profile={profile}
                setProfile={setProfile}
              ></EditExhibitions>
            </div>
            <div>
              <EditSocials
                profile={profile}
                setProfile={setProfile}
              ></EditSocials>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            disableElevation
            rounded
            onClick={cancel}
          >
            {capitalizeFirst(t("common:words.cancel"))}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            rounded
            onClick={makeChanges}
          >
            {capitalizeFirst(t("common:words.save"))}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const populateProfileObject = (userProfile): Profile => {
  return {
    title: userProfile?.Title,
    headline: userProfile?.Headline,
    location: userProfile?.Location,
    about: userProfile?.About,
    studio: userProfile?.Studio,
    inspiredBy: userProfile?.InspiredBy,
    educations: userProfile?.Educations?.map((e) => ({
      from: e.From ? e.From : false,
      to: e.To ? e.To : false,
      name: e.Name,
      key: v4(),
    })),
    exhibitions: userProfile?.Exhibitions?.map((e) => ({
      key: v4(),
      from: e.From ? e.From : false,
      to: e.To ? e.To : false,
      name: e.Name,
      place: e.Place,
    })),
    socialMedia: {
      instagram: userProfile?.SocialMedia?.Instagram,
      facebook: userProfile?.SocialMedia?.Facebook,
      linkedIn: userProfile?.SocialMedia?.LinkedIn,
      dribbble: userProfile?.SocialMedia?.Dribble,
      behance: userProfile?.SocialMedia?.Behance,
      website: userProfile?.SocialMedia?.Website,
    },
  };
};

const createOriginalProfileObject = (userProfile: Profile) => {
  return {
    Title: userProfile?.title,
    Headline: userProfile?.headline,
    Location: userProfile?.location,
    About: userProfile?.about,
    Studio: userProfile?.studio,
    InspiredBy: userProfile?.inspiredBy,
    Educations: userProfile?.educations?.map((e) => ({
      From: e.from ? e.from : false,
      To: e.to ? e.to : false,
      Name: e.name,
    })),
    Exhibitions: userProfile?.exhibitions?.map((e) => ({
      From: e.from ? e.from : false,
      To: e.to ? e.to : false,
      Name: e.name,
      Place: e.place,
    })),
    SocialMedia: {
      Instagram: userProfile?.socialMedia?.instagram,
      Facebook: userProfile?.socialMedia?.facebook,
      LinkedIn: userProfile?.socialMedia?.linkedIn,
      Dribble: userProfile?.socialMedia?.dribbble,
      Behance: userProfile?.socialMedia?.behance,
      Website: userProfile?.socialMedia?.website,
    },
  };
};
