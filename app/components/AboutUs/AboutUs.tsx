import React, { useEffect, useState } from 'react'
import { styles } from './aboutUs.css'
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

interface ImageProps {
  artwork: string;
  username: string;
  imageLink: string;
  name: string;
}

export default function AboutMe() {
  const s = styles();
  const { t } = useTranslation(['profile', 'tags']);


  const founders = [
    { name: "Erik Nordlander", title: "CEO & Founder", image: '/staff/artportable_erik.jpg', email: "erik@artportable.com"},
    { name: "Johan Höök", title: "Business Development & Founder", image: '/staff/artportable_johan.jpg', email: "johan@artportable.com"},
    { name: "Carl Nyberg", title: "COO", image: '/staff/artportable_carl.jpg', email: "carl@artportable.com"},
  ]

  const employees = [
    { name: "Axel Nordblom", title: "Finance Manager", image: '/staff/artportable_axel.jpg', email: ""},
    { name: "Emil Sundberg", title: "Web Developer", image: '/staff/artportable_emil.jpg', email: ""},
    { name: "Jacob Karlsson", title: "Sales Manager", image: '/staff/artportable_jacob.jpg', email: "jacob@artportable.com"},
    { name: "Matilda Wirström", title: "Content Manager", image: '/staff/artportable_blur.jpg', email: ""},
    { name: "Nannie Höök", title: "Content Creator", image: '/staff/artportable_nannie.jpg', email: "nannie@artportable.com"},
    { name: "Linus Gustin", title: "Art Coordinator", image: '/staff/artportable_linus.jpg', email: "linus@artportable.com"},
    { name: "Patrik Söderberg", title: "IT Manager", image: '/staff/artportable_patrik.jpg', email: ""},
    { name: "Richard Leppänen", title: "Senior Art Coordinator", image: '/staff/artportable_richard.jpg', email: ""},
    { name: "Tony Lidén", title: "Art Coordinator", image: '/staff/artportable_tony.jpg', email: "tony@artportable.com"},
  ]


  return (
    <div>
      <div className={s.headerDiv}>
        <Typography variant="h1" className={s.headerTypo}>
          Om Artportable
        </Typography>
        <Typography variant="h4">
          Artportable är ett digitalt galleri med över 30.000 konstverk. Artportables portfolioverktyg är extremt lätt för konstnärer att använda och konstintresserade kommer snabbt i kontakt med ny, spännande originalkonst på listor som: ”Höjdpunkter”, ”Trendande” och ”Senaste”. Artportable har även ett fysiskt Showroom på Södermalm, Stockholm.
        </Typography>
      </div>
      <div className={s.flex}>
        <div className={s.container}>
          {founders.map((person) => (
            <div className={s.wrapper}>
              <img
                className={s.image}
                src={(person?.image)}
                alt=""
                title="" />
              <Typography className={s.bold}>
                {person?.name}
              </Typography>
              <Typography>
                {person?.title}
              </Typography>
              <Typography>
                {person?.email}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={s.linebreak}>
      </div>
      <div className={s.flex}>
        <div className={s.container}>
          {employees.map((person) => (
            <div className={s.wrapper}>
              <img
                className={s.image}
                src={(person?.image)}
                alt=""
                title="" />
              <Typography className={s.bold}>
                {person?.name}
              </Typography>
              <Typography>
                {person?.title}
              </Typography>
              <Typography>
                {person?.email}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}



