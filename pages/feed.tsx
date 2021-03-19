import React from 'react';
import Feed from '../app/components/Feed/Feed';
import Head from 'next/head'
import Link from 'next/Link'
import Main from '../app/components/Main/Main'
import Button from '../app/components/Button/Button'
import Box from '@material-ui/core/Box'
import ProfileCard from '../app/components/ProfileCard/ProfileCard'

import { styles } from '../styles/feed.css';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { FeedItem, FeedItemType } from '../app/models/FeedItem';


export default function FeedPage() {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);
  const user = {
    username: "mrArtist",
    shortDescription: "I like painting in nature",
    location: "Gibraltar",
    followers: 13,
    follows: 15,
    worksOfArt: 22
  }

  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Box className={s.feedContainer}>
          <div className={s.colLeft}>
            <ProfileCard userId={''} user={user}></ProfileCard>
            <Button
              className={s.uploadArtButton}
              size="small"
              variant="contained"
              color="primary"
              disableElevation>
                {t('uploadNewWorkOfArt')}
            </Button>
          </div>
          <div className={s.colFeed}><Feed items={feedItems}></Feed></div>
          <div className={s.colRight}>right</div>
        </Box>
      </Main>
    </>
  );
}


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'feed']),
    }
  }
}

const feedItems: Array<FeedItem> = [
  {
    Type: FeedItemType["artwork"],
    User: "andersand",
    Location: "Stockholm, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "25320c5e-f58a-4b1f-b63a-8ee07a840bdf",
      PrimaryFile: "3fbe2aea-2257-44f2-b3b1-3d8bacade89c.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "andersand",
    Location: "Stockholm, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "1efe7a31-8dcc-4ff0-9b2d-5f148e2989cc",
      PrimaryFile: "43de8b65-8b19-4b87-ae3c-df97e18bd461.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "andersand",
    Location: "Stockholm, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "b24e3df5-0394-468d-9c1d-db1252fea920",
      PrimaryFile: "46194927-ccda-432f-bc95-4820318c08c7.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "ludde",
    Location: "Vemdalen, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "9f35e705-637a-4bbe-8c35-402b2ecf7128",
      PrimaryFile: "4cdd494c-e6e1-4af1-9e54-24a8e80ea2b4.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "ludde",
    Location: "Vemdalen, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "939df3fd-de57-4caf-96dc-c5e110322a96",
      PrimaryFile: "5c20ca95-bb00-4ef1-8b85-c4b11e66eb54.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "ludde",
    Location: "Vemdalen, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "d70f656d-75a7-45fc-b385-e4daa834e6a8",
      PrimaryFile: "6b33c074-65cf-4f2b-913a-1b2d4deb7050.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "ludde",
    Location: "Vemdalen, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "ce1d2b1c-7869-4df5-9a32-2cbaca8c3234",
      PrimaryFile: "7e80a4c8-0a8a-4593-a16f-2e257294a1f9.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "kallebanan",
    Location: "Kalleland",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "2645bd94-3624-43fc-b21f-1209d730fc71",
      PrimaryFile: "8d351bbb-f760-4b56-9d4e-e8d61619bf70.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "andersand",
    Location: "Stockholm, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "3f41dc87-e8de-42ee-ac8d-355e4d3e1a2d",
      PrimaryFile: "b2894002-0b7c-4f05-896a-856283012c87.jpg",
      SecondaryFile: null,
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "ludde",
    Location: "Vemdalen, Sweden",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "d3118665-43e3-4905-8848-5e335a428dd5",
      PrimaryFile: "cc412f08-2a7b-4225-b659-07fdb168302d.jpg",
      SecondaryFile: "cd139111-c82e-4bc8-9f7d-43a1059bfe73.jpg",
      TertiaryFile: null
    }
  },
  {
    Type: FeedItemType["artwork"],
    User: "kallebanan",
    Location: "Kalleland",
    Published: new Date("2021-03-16T15:21:33"),
    Item: {
      Id: "136f358d-98fb-4961-855c-59d5a6d1fa19",
      PrimaryFile: "dc3f39bf-d1da-465d-9ea4-935902c2e3d2.jpg",
      SecondaryFile: "e0e32179-109c-4a8a-bf91-3d65ff83ca29.jpg",
      TertiaryFile: "fdfe7329-e05c-41fb-a7c7-4f3226d28c49.jpg"
    }
  }
];