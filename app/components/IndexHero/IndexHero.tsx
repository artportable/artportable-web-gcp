import { useEffect, useState } from 'react'
import { Typography, Chip, Paper } from '@material-ui/core';
import { styles } from './indexHero.css'
import { useTranslation } from "next-i18next";
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from "next/router";

import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import Button from '../Button/Button'
import { FullWidthBlock } from '../Main/Main'

export default function IndexHero() {
  const s = styles();
  const { t } = useTranslation('index');
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const promotedUser = getUser;

  const [signUpRedirectHref, setSignUpRedirectHref] = useState('');

  useEffect(() => {
    const isDefaultLocale = router.locale == router.defaultLocale;
    const redirectHref = `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/plans`
    setSignUpRedirectHref(redirectHref);
  }, []);

  const images = {
    Persona: 'https://i.guim.co.uk/img/media/7f260701ee8a82171fc468598ec46fdcb555c195/0_429_4770_2861/master/4770.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=eda98f47962e9ae7e414bcfe511b8d7a',
    Bibi: 'https://www.svtstatic.se/image/wide/480/21891198/1555316603?format=auto',
    Bibbi: 'https://www2.bfi.org.uk/sites/bfi.org.uk/files/styles/full/public/image/persona-1966-003-bibi-andersson-sunglasses.jpg?itok=YqcT6ldS',
};

const imagesArray = Object.entries(images).map(image => {
    return { name: image[0], random: image[1] }
  
})


// let countries = {
//   USA: 'https://www.countryflags.io/US/shiny/64.png',
//   Australia: 'https://www.countryflags.io/AU/shiny/64.png',
//   'Puerto Rico': 'https://www.countryflags.io/PR/shiny/64.png',
// };

// //I changed the object to array for better data manipulation.
// const countriesArray = Object.entries(countries).map(country => {
//   return { name: country[0], flag: country[1] }
// })

// //Getting random country index by its length
// const randomCountryIndex = Math.floor(Math.random() * countriesArray.length);

// console.log("Set the current country: ", countriesArray[randomCountryIndex])
// console.log("Set the random flag: ", countriesArray[randomCountryIndex].flag)


//Getting random image index by its length
const randomImageIndex = Math.floor(Math.random() * imagesArray.length);
console.log("Set the current name: ", imagesArray[randomImageIndex])

function getUser(name) {
  if (imagesArray === {name: Persona}) {
    return "atle.reilo";
  } else if (imagesArray === {name: Bibi}) {
    return 'premium';
  }else if (imagesArray === {name: Bibbi}) {
    return 'staxx';
  }

}

  return (
    <div className={s.container}>
      <div className={s.flexContainer}>
        <div>
          <div className={s.left}>
            <Typography variant="h1" className={s.headline}>
              {t('header')}
            </Typography>
            <Typography variant="body1" className={s.description}>
              {t('subHeader')}
            </Typography>
            <div className={s.signupButtonContainer}>
              <Button
                classes={{
                  label: s.buttonLabel
                }}
                size="small"
                variant="contained"
                color="primary"
                disableElevation
                rounded
                onClick={() => keycloak.register({
                  locale: router.locale,
                  redirectUri: signUpRedirectHref})}>
                {t('signUp')}
              </Button>
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.paintingContainer}>
            <Paper elevation={5}>
              <img 
                className={s.boosted} 
                src={imagesArray[randomImageIndex].random} 
                alt={`${t("artworkFrom")} ${promotedUser}`}
                title={`${t("artworkFrom")} ${promotedUser}`}/>
            </Paper>
            <div className={s.createdBy}>
              <Chip
                onClick={(_) => router.push(`/profile/@${promotedUser}`)}
                size="small"
                classes={{
                  root: s.chip,
                }}
                avatar={
                  <div className={s.chipAvatar}>
                    <ProfileAvatar size={19} profilePicture="1624177845876blob.jpg" />
                  </div>
                }
                label={promotedUser}/>
            </div>
          </div>
          <div>
            {/* <img className={s.sofaImage} src="/images/soffa-cropped-landing-hero.png"></img> */}
          </div>
        </div>
      </div>
    </div>
  );
}
