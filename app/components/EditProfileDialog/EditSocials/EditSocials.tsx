import { useState, useEffect } from 'react'
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import { EditDialogSection } from "../EditDialogSection/EditDialogSection";
import { useTranslation } from "next-i18next";
import clsx from 'clsx'
import { styles } from './editSocials.css'

import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import ClearIcon from "@material-ui/icons/Clear";
import Icon from "@material-ui/core/Icon";
import { log } from 'console';

export const EditSocials = ({ profile, setProfile }) => {
  const s = styles();
  const { t } = useTranslation("profile");

  const setSocialMediaProp = (newText: string, propName: string) => {
    profile.socialMedia[propName] = newText;
    setProfile({ ...profile });
  };

  const resetSocialMediaProp = (propName: string, event) => {
    profile.socialMedia[propName] = "";
    event.target.value = "";
    setProfile({ ...profile });
  };

  const ResetAdornment = ({ socialMedia }) => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="close"
          onClick={(e) => resetSocialMediaProp(socialMedia, e)}
        >
          <ClearIcon></ClearIcon>
        </IconButton>
      </InputAdornment>
    );
  };

  enum SocialMediaSite {
    INSTAGRAM = 'instagram',
    FACEBOOK = 'facebook',
    LINKEDIN = 'linkedIn',
    DRIBBBLE = 'dribbble',
    BEHANCE = 'behance',
    WEBSITE = 'website',
  }

  const DefaultURLs = {
    'instagram': 'https://www.instagram.com/',
    'facebook': 'https://www.facebook.com/',
    'linkedIn': 'https://linkedin.com/',
    'dribbble': 'https://dribbble.com/',
    'behance': 'https://www.behance.net/',
    'website': 'https://',
  }
  
  const updateAndValidate = (newValue, siteName) => {
    const defaultURL = DefaultURLs[siteName]

    if (newValue !== defaultURL) {
      setSocialMediaProp(newValue, siteName)
    } else {
      // If deleting so only default url is left, set url on profile as empty.
      setSocialMediaProp('', siteName)
    }
  }
  
  let instagramInput = profile?.socialMedia?.instagram || DefaultURLs.instagram
  let facebookInput = profile?.socialMedia?.facebook || DefaultURLs.facebook
  let linkedInInput = profile?.socialMedia?.linkedIn || DefaultURLs.linkedIn
  let dribbbleInput = profile?.socialMedia?.dribbble || DefaultURLs.dribbble
  let behanceInput = profile?.socialMedia?.behance || DefaultURLs.behance
  let websiteInput = profile?.socialMedia?.website || DefaultURLs.website

  console.log('profile?.socialMedia', profile?.socialMedia ?? 'nope');
  

  return (
    <EditDialogSection title={t("socialNetworks")}>

    <TextField
        label={t("instagram")}
        value={instagramInput}
        onChange={(event) => updateAndValidate(event.target.value, SocialMediaSite.INSTAGRAM)}
        onFocus={() => {}}
        inputProps={{ maxLength: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InstagramIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="close"
                onClick={(e) => resetSocialMediaProp(SocialMediaSite.INSTAGRAM, e)}
              >
                <ClearIcon></ClearIcon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        // placeholder={t("enterUserName")}
        className={clsx(s.socialUrlField, {
          [s.grayedOut]: instagramInput === DefaultURLs.instagram,
        })}
        helperText={
          profile.socialMedia?.instagram &&
          profile.socialMedia.instagram != "" &&
          !profile?.socialMedia.instagram.match(
            /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim
          )
            ? t("instagramUrl")
            : ""
        }
      />

      <TextField
        label={t("facebook")}
        value={facebookInput}
        onChange={(event) => updateAndValidate(event.target.value, SocialMediaSite.FACEBOOK)}
        inputProps={{ maxLength: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FacebookIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <ResetAdornment socialMedia={SocialMediaSite.FACEBOOK}></ResetAdornment>
          ),
        }}
        className={clsx(s.socialUrlField, {
          [s.grayedOut]: facebookInput === DefaultURLs.facebook,
        })}
        helperText={
          profile.socialMedia?.facebook &&
          profile.socialMedia?.facebook != "" &&
          !profile?.socialMedia?.facebook?.match(
            /(?:http|https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/gi
          )
            ? t("facebookUrl")
            : ""
        }
      />

      <TextField
        label={t("linkedIn")}
        value={linkedInInput}
        onChange={(event) => updateAndValidate(event.target.value, SocialMediaSite.LINKEDIN)}
        inputProps={{ maxLength: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <ResetAdornment socialMedia={SocialMediaSite.LINKEDIN}></ResetAdornment>
          ),
        }}
        className={clsx(s.socialUrlField, {
          [s.grayedOut]: linkedInInput === DefaultURLs.linkedIn,
        })}
        helperText={
          profile.socialMedia?.linkedIn &&
          profile.socialMedia.linkedIn != "" &&
          !profile?.socialMedia?.linkedIn?.match(
            /(?:http|https?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile|company)/gm
          )
            ? t("linkedinUrl")
            : ""
        }
      />

      {/* Saving Dribble address does not work. */}
      {/*<TextField
        label={t("dribbble")}
        value={dribbbleInput}
        onChange={(event) => updateAndValidate(event.target.value, SocialMediaSite.DRIBBBLE)}
        inputProps={{ maxLength: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className="fab fa-dribbble" />
            </InputAdornment>
          ),
          endAdornment: (
            <ResetAdornment socialMedia={SocialMediaSite.DRIBBBLE}></ResetAdornment>
          ),
        }}
        className={clsx(s.socialUrlField, {
          [s.grayedOut]: dribbbleInput === DefaultURLs.dribbble,
        })}
        helperText={
          profile.socialMedia?.dribble &&
          profile.socialMedia.dribble != "" &&
          !profile?.socialMedia?.dribble?.match(
            /(?:http|https?:\/\/)?([\w]+\.)?behance\.com\//gm
          )
            ? t("dribbleUrl")
            : ""
        }
      />*/}

      <TextField
        label={t("behance")}
        value={behanceInput}
        onChange={(event) => updateAndValidate(event.target.value, SocialMediaSite.BEHANCE)}
        inputProps={{ maxLength: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className="fab fa-behance-square" />
            </InputAdornment>
          ),
          endAdornment: (
            <ResetAdornment socialMedia={SocialMediaSite.BEHANCE}></ResetAdornment>
          ),
        }}
        className={clsx(s.socialUrlField, {
          [s.grayedOut]: behanceInput === DefaultURLs.behance,
        })}
        helperText={
          profile.socialMedia?.behance &&
          profile.socialMedia.behance != "" &&
          !profile?.socialMedia?.behance?.match(
            /(?:http|https?:\/\/)?([\w]+\.)?behance\.com\//gm
          )
            ? t("behanceUrl")
            : ""
        }
      />

      <TextField
        label={t("website")}
        value={websiteInput}
        onChange={(event) => updateAndValidate(event.target.value, SocialMediaSite.WEBSITE)}
        inputProps={{ maxLength: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LanguageIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <ResetAdornment socialMedia={SocialMediaSite.WEBSITE}></ResetAdornment>
          ),
        }}
        className={clsx(s.socialUrlField, {
          [s.grayedOut]: websiteInput === DefaultURLs.website,
        })}
        helperText={
          profile.socialMedia?.website &&
          profile.socialMedia?.website != "" &&
          !profile?.socialMedia?.website?.match(
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/gi
          )
            ? t("websiteUrl")
            : ""
        }
      />
    </EditDialogSection>
  );
};
