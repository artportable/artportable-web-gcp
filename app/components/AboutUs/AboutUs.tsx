import React, { useEffect, useState } from 'react'
import { styles } from './aboutUs.css'
import { useTranslation } from 'react-i18next';

interface ImageProps {
  artwork: string;
  username: string;
  imageLink: string;
  name: string;
}

export default function AboutMe() {
  const s = styles();
  const { t } = useTranslation(['profile', 'tags']);


  const images = [
    { name: "Malin Ekström", username: "malin.ekstrom", image: '/images/malin_ekstrom.jpg', imageLink: "art/20898a9a-234d-45ec-9553-ae78beef1332" },
    { name: "Galina Tol-Fakkar", username: "galina.tolfakkar", image: '/images/galina_tol_fakkar.jpg', imageLink: "profile/@galina.tolfakkar" },
    { name: "Brian Morris", username: "brianmorris", image: '/images/brian_morris.jpg', imageLink: "art/e10b504e-0ef1-43b0-b97f-944ef3e93ac6" },
    { name: "Anette Lillhammar", username: "anette", image: '/images/anette_lillhammar.jpg', imageLink: "art/40108179-ccca-4ee8-8d99-e0ec644e4800" },
  ]


  return (
    <div>
      {images.map((option) => (

      <img
        // className={s.image}
        src={(option.image)}
        alt={`${t("artworkFrom")} ${option.username}`}
        title={`${t("artworkFrom")} ${option.username}`} />
      ))}
    </div>
  );
}