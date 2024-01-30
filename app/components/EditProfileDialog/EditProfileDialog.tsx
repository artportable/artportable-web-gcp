import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Select,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Button from "../Button/Button";

import { useTranslation } from "next-i18next";
import { mutate } from "swr";
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
import { Country, State, City } from "country-state-city";

import { allCountriesData } from "../../../public/countries/allCountries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../../../styles/theme";
import useTheme from "@mui/material/styles/useTheme";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface Profile {
  title: string;
  headline: string;
  location: string;
  country?: string;
  state?: string;
  city?: string;
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

export default function EditProfileDialog({ userProfile }) {
  const s = styles();
  const { t } = useTranslation(["profile", "common"]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { username } = useContext(UserContext);
  const token = useContext(TokenContext);
  const { refreshToken } = useRefreshToken();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [selectedCity, setSeletedCity] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const countries = allCountriesData.map((country) => ({
      name: country.name,
      isoCode: country.isoCode,
    }));
    setCountries(countries);
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountryString = event.target.value;
    const selectedCountry = JSON.parse(selectedCountryString);
    const selectedCountryCode = selectedCountry.isoCode;
    const selectedCountryName = selectedCountry.name;
    setSelectedCountryName(selectedCountryName);

    setProfile({
      ...userProfile,
      country: selectedCountryName,
    });

    setSelectedCountry(selectedCountryCode);
    setStates(State.getStatesOfCountry(selectedCountryCode));
  };

  const handleStateChange = (event) => {
    const selectedStateString = event.target.value;
    const selectedState = JSON.parse(selectedStateString);
    const selectedStateName = selectedState?.name;

    setProfile({
      ...profile,
      state: selectedStateName,
    });

    const citiesOfState = City.getCitiesOfState(
      selectedCountry,
      selectedState.isoCode
    );
    setCities(citiesOfState);
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setSeletedCity(selectedCityName);

    setProfile({
      ...profile,
      city: selectedCityName,
    });
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [profile, setProfile] = useState<Profile>(
    populateProfileObject(userProfile)
  );

  const makeChanges = async () => {
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

      mutate(getUserProfileSummaryUri(username.value));

      setProfile(populateProfileObject(userProfile));
    } catch (error) {
      console.error("Error updating profile:", error);
      console.log("Error updating profile:", error);
    }
  };

  const validate = (p) => {
    // Check educations for null 'from' and 'to'
    profile?.educations?.forEach((e) => {
      if (e.from === undefined || e.from === null) {
        e.from = null;
      }
      if (e.to === undefined || e.to === null) {
        e.to = null;
      }
    });

    // Check exhibitions for null 'from' and 'to'
    profile?.exhibitions?.forEach((e) => {
      if (e.from === undefined || e.from === null) {
        e.from = null;
      }
      if (e.to === undefined || e.to === null) {
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
      <div className={s.buttonPosition}>
        <Button
          className={s.editProfileButton}
          rounded
          startIcon={<EditIcon className={s.editProfileIcon} />}
          onClick={() => setOpenEdit(true)}
        >
          <div>{t("editProfile")}</div>
        </Button>
        <div>
          {userProfile?.City ? (
            ""
          ) : (
            <div className={s.fillIn}> {t("fillInCountry")}</div>
          )}
        </div>
      </div>

      <Dialog
        open={openEdit}
        onClose={cancel}
        fullScreen={fullScreen}
        maxWidth={fullScreen ? false : "md"}
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
              <TextField
                label={t("headline")}
                defaultValue={profile.headline}
                multiline
                onChange={(event) =>
                  setProfile({ ...profile, headline: event.target.value })
                }
                inputProps={{ maxLength: 140 }}
              />

              <select className={s.selectInfo} onChange={handleCountryChange}>
                <option hidden>
                  {userProfile?.Country ? userProfile?.Country : t("country")}
                </option>
                <option disabled></option>
                {countries.map((country, index) => (
                  <option
                    key={index}
                    value={JSON.stringify(country)}
                    className={s.optionStyle}
                  >
                    {country?.name}
                  </option>
                ))}
              </select>

              <select className={s.selectInfo} onChange={handleStateChange}>
                <option hidden>
                  {userProfile?.State ? userProfile?.State : t("state")}
                </option>
                <option disabled></option>
                {states.map((state, index) => (
                  <option
                    key={index}
                    value={JSON.stringify(state)}
                    className={s.optionStyle}
                  >
                    {state.name}
                  </option>
                ))}
              </select>

              <select className={s.selectInfo} onChange={handleCityChange}>
                <option hidden>
                  {userProfile?.City ? userProfile?.city : t("city")}
                </option>
                <option disabled></option>
                {cities.map((city, index) => (
                  <option
                    key={index}
                    value={city.name}
                    className={s.optionStyle}
                  >
                    {city.name}
                  </option>
                ))}
              </select>

              <TextField
                label={t("aboutMe")}
                defaultValue={profile?.about}
                multiline
                minRows={3}
                style={{ marginBottom: "20px" }}
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
    country: userProfile?.Country,
    state: userProfile?.State,
    city: userProfile?.City,
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
    Country: userProfile?.country,
    State: userProfile?.state,
    City: userProfile?.city,
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
