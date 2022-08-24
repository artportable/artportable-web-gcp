import React, { useEffect, useState } from 'react'
import { styles } from './aboutUs.css'
import { useTranslation } from 'next-i18next';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface ImageProps {
  artwork: string;
  username: string;
  imageLink: string;
  name: string;
}

export default function AboutMe() {
  const s = styles();
  const { t } = useTranslation(['about']);
  const router = useRouter()

  const staff = [
    { name: "Emil Sundberg", title: "Web Developer", image: '/staff/artportable_emil.jpg', email: "" },
    { name: "Linus Gustin", title: "Art Coordinator", image: '/staff/artportable_linus.jpg', email: "linus@artportable.com" },
    { name: "Linus Hedberg", title: "Web Developer", image: '/staff/linus_hedberg.jpg', email: "" },
    { name: "Matilda Wirström", title: "Content Manager", image: '/staff/artportable_matilda.jpg', email: "" },
    { name: "Nannie Höök", title: "Content Creator", image: '/staff/artportable_nannie.jpg', email: "" },
    { name: "Patrik Söderberg", title: "IT Manager", image: '/staff/artportable_patrik.jpg', email: "" },
    { name: "Richard Leppänen", title: "Senior Art Coordinator", image: '/staff/artportable_richard.jpg', email: "richard@artportable.com" },
    { name: "Tony Lidén", title: "Art Coordinator", image: '/staff/artportable_tony.jpg', email: "tony@artportable.com" },
    { name: "Cosmo", title: "", image: '/staff/artportable_cosmo.jpg', email: "hello@artportable.com" },
  ]

  const board = [
    { name: "Carl Nyberg", title: "COO", image: '/staff/artportable_carl.jpg', email: "carl@artportable.com" },
    { name: "Erik Nordlander", title: "CEO & Founder", image: '/staff/artportable_erik.jpg', email: "erik@artportable.com" },
    { name: "Johan Höök", title: "Business Development & Founder", image: '/staff/artportable_johan.jpg', email: "johan@artportable.com" },
  ]
  const applyEn = [
    { image: '/staff/missyou_en.png', email: "work@artportable.com" },
  ]
  const applySv = [

    { image: '/staff/missyou_sv.png', email: "work@artportable.com" },
  ]


  return (
    <div className={s.container}>
      <div className={s.headerDiv}>
        <Typography variant="h1" className={s.headerTypo}>
          {t('aboutUs')}
        </Typography>
        <Typography variant="h4" className={s.subHeaderTypo}>
          {t('digitalGallery')}
        </Typography>
        <Typography variant="h4">
          {t('showRoom')}
        </Typography>
      </div>
      <div className={s.flex}>
        <iframe className={s.videoFrame} src="https://player.vimeo.com/video/708144642?h=6eb4ca476d&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allowFullScreen title="Artportable commercial"></iframe>
      </div>
      <div className={s.staffDiv}>
        {staff.map((person) => (
          <div key={person.name} className={s.wrapper}>
            <div className={s.frame}>
              <img
                className={s.image}
                src={(person?.image)}
                alt=""
                title="" />
            </div>
            <Typography className={s.bold}>
              {person?.name}
            </Typography>
            <Typography>
              {person?.title}
            </Typography>
            <Typography>
              <a href={`mailto:${person?.email}`}>
                {person?.email}
              </a>
            </Typography>
          </div>
        ))}
      </div>

      <div className={clsx(s.bottomDiv, s.staffDiv)}>
        {board.map((person) => (
          <div key={person.name} className={s.wrapper}>
            <div className={s.frame}>
              <img
                className={s.image}
                src={(person?.image)}
                alt=""
                title="" />
            </div>
            <Typography className={s.bold}>
              {person?.name}
            </Typography>
            <Typography>
              {person?.title}
            </Typography>
            <Typography>
              <a href={`mailto:${person?.email}`}>
                {person?.email}
              </a>
            </Typography>
          </div>
        ))}
      </div>
      {router.locale === "en" ?
        <>
          <div className={clsx(s.bottomDiv, s.staffDiv)}>
            {applyEn.map((person) => (
              <div key={person.image} className={s.wrapper}>
                <a href={`mailto:${person?.email}`}>
                  <div className={s.frame}>
                    <img
                      className={s.image}
                      src={(person?.image)}
                      alt=""
                      title="" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </>
        :
        <>
          <div className={clsx(s.bottomDiv, s.staffDiv)}>
            {applySv.map((person) => (
              <div key={person.image} className={s.wrapper}>
                <a href={`mailto:${person?.email}`}>
                  <div className={s.frame}>
                    <img
                      className={s.image}
                      src={(person?.image)}
                      alt=""
                      title="" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </>
      }
    </div >
  );
}



