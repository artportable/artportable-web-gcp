import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import { TextField, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { Country, State, City } from "country-state-city";
import { allCountriesData } from "../../../../public/countries/allCountries";
import { styles } from "./editLocation.css";

export const EditLocation = ({ profile, setProfile }) => {
  const { t } = useTranslation("profile");
  const s = styles();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [selectedCity, setSeletedCity] = useState("");

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

    setProfile((prevProfile) => ({
      ...prevProfile,
      country: selectedCountryName,
    }));

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

  return (
    <>
      <div>
        <select className={s.selectInfo} onChange={handleCountryChange}>
          <option hidden>
            {profile?.Country ? profile?.Country : t("country")}
          </option>
          <option disabled></option>
          {countries.map((country, index) => (
            <option
              className={s.optionStyle}
              key={index}
              value={JSON.stringify(country)}
            >
              {country?.name}
            </option>
          ))}
        </select>
        <select className={s.selectInfo} onChange={handleStateChange}>
          <option hidden>{profile?.State ? profile?.State : t("state")}</option>
          <option disabled></option>
          {states.map((state, index) => (
            <option
              className={s.optionStyle}
              key={index}
              value={JSON.stringify(state)}
            >
              {state.name}
            </option>
          ))}
        </select>
        <select className={s.selectInfo} onChange={handleCityChange}>
          <option hidden>{profile.City ? profile.city : t("city")}</option>
          <option disabled></option>
          {cities.map((city, index) => (
            <option className={s.optionStyle} key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
