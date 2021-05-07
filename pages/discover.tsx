import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from '../styles/discover.css';
import React, { useState } from "react";
import { useRouter } from "next/router";
import Main from '../app/components/Main/Main'
import { useTranslation } from "next-i18next";
import { Box, Tab, Tabs } from "@material-ui/core";
import TabPanel from '../app/components/TabPanel/TabPanel'
import DiscoverArt from "../app/components/DiscoverArt/DiscoverArt";
import DiscoverArtists from "../app/components/DiscoverArtists/DiscoverArtists";


export default function DiscoverPage() {
  const { t } = useTranslation(['common', 'discover']);
  const s = styles();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);

  const artists = [
    {
      Username: "Konstnärsfantast",
      ProfilePicture: "1b2435ff-508b-4b80-80cc-5a0d2c82d597.jpg",
      Location: "Stockholm",
      Tags: ["oil", "acrylic", "watercolor"],
      Artworks: [
        { Name: "001bebc7-c5de-434d-9e7a-052e639c5030.jpg", Width : 960, Height : 640},
        { Name: "0159d15c-fa42-45cb-9b0a-157575befdbb.jpg", Width : 405, Height : 720},
        { Name: "0167fae1-5366-44a5-bdd0-34fd7b17c029.jpg", Width : 960, Height : 702},
        { Name: "02039979-70f1-4595-9899-851739a23a6e.jpg", Width : 960, Height : 642},
        { Name: "0641b665-1834-4068-9359-d019ccc3c7ca.jpg", Width : 960, Height : 639},
        { Name: "0d238ac1-a275-4497-8127-2dbec346d772.jpg", Width : 960, Height : 680},
        { Name: "12af348a-9ae0-44d2-b931-95e8f793a020.jpg", Width : 960, Height : 627},
        { Name: "145e7009-1f39-4947-9479-5f6d48fe63ae.jpg", Width : 960, Height : 678},
        { Name: "16de331c-b960-406d-a23d-03226cab545b.jpg", Width : 960, Height : 640},
      ]
    }, {
      Username: "Nisse",
      // ProfilePicture: "dc90aff9-003a-4545-876d-d5706400b475.jpg",
      Location: "Bornholm",
      Tags: ["oil", "acrylic", "paint"],
      Artworks: [
        { Name : "71fb7794-e0cc-4ebe-a715-d2465dc8b622.jpg", Width : 1250, Height : 1500},
        { Name : "739ee7da-609a-48c1-b511-cde4a8582529.jpg", Width : 2000, Height : 1500},
        { Name : "7c3bc8cd-9a6b-40f0-8560-b0344b0b1cc2.jpg", Width : 960, Height : 540},
        { Name : "7c538ca3-9d49-48a4-8e5b-40f97ad3dc01.jpg", Width : 960, Height : 637},
        { Name : "7c9eb420-59fc-4270-a964-d86d66aad3ec.jpg", Width : 960, Height : 636},
        { Name : "7d34e30f-eb46-4261-bc76-ff4fccf6f25d.jpg", Width : 960, Height : 676},
        { Name : "8094b72f-b33b-4e0e-90ba-6cafb916514d.jpg", Width : 540, Height : 720},
        { Name : "8400238a-5da3-4a0c-a8da-660603c4fd34.jpg", Width : 1002, Height : 1500},
        { Name : "8467cca3-b573-43d5-b75d-7107ad61cd22.jpg", Width : 960, Height : 701},
        { Name : "8acdab53-9a42-431d-a759-f8316c6f8802.jpg", Width : 577, Height : 720},
        { Name : "8b4436fe-79d1-43f3-bca0-e745d987e596.jpg", Width : 960, Height : 539},
        { Name : "8c52a873-169d-4588-bdbc-ded55b62eac0.jpg", Width : 960, Height : 644},
        { Name : "907d3d64-ca20-4595-9697-a6218576e7af.jpg", Width : 2250, Height : 1500},
        { Name : "919b248c-e362-4be0-b4f5-b0217ef6b7cc.jpg", Width : 2375, Height : 1500},
        { Name : "9239fb1e-5d57-4fd5-9087-11570b126490.jpg", Width : 751, Height : 720},
        { Name : "98e0b86a-963f-4115-b32e-2af1d16ecb6b.jpg", Width : 1500, Height : 2250},
        { Name : "9b6bfa4b-ca6f-4f93-8ee0-fcd78081e0aa.jpg", Width : 586, Height : 720},
        { Name : "9c220b33-63df-4332-b784-e061ef4b7a8a.jpg", Width : 960, Height : 664},
        { Name : "9c4adf63-5634-4a02-8455-3b811dea7a08.jpg", Width : 960, Height : 640},
        { Name : "9e4f078b-1ba5-4831-9679-0b5d0f8cd7fe.jpg", Width : 941, Height : 720},
        { Name : "9f0dcb40-def3-4034-973a-02f7d6d12f59.jpg", Width : 913, Height : 720},
        { Name : "a224adb0-5b1e-4199-b1c0-c24db24039e4.jpg", Width : 1000, Height : 1500},
        { Name : "a2e712b4-1cdb-468e-9d51-31fce860790b.jpg", Width : 960, Height : 618},
        { Name : "a361637c-0dbb-4ba1-9c43-4bac94c754da.jpg", Width : 960, Height : 639},
        { Name : "a82850e4-c6ac-4b0c-85d6-c7e54f99ea8a.jpg", Width : 2520, Height : 1492},
        { Name : "a880e09b-3d36-4bb9-b0d6-32e73f741a2b.jpg", Width : 416, Height : 720},
        { Name : "a8a657b4-8b92-4ba2-9f61-d310e75741d3.jpg", Width : 895, Height : 720},
        { Name : "ac80c64a-ef8a-425c-a213-c67df6c0216e.jpg", Width : 960, Height : 615},
        { Name : "af8da05a-1ef8-4f49-8e8c-6c5e38ae2e96.jpg", Width : 960, Height : 540},
        { Name : "b0546b2a-38f2-44b2-b973-c01105617c14.jpg", Width : 960, Height : 685},
        { Name : "b2ddb2f3-0f03-4260-a9a8-d6438e7b45f0.jpg", Width : 479, Height : 720},
        { Name : "b2ea355a-35d1-4880-b976-2107f7df02b2.jpg", Width : 1000, Height : 1500},
        { Name : "b51419f9-5f86-4d1a-9f60-2cbde8093e2d.jpg", Width : 960, Height : 640},
        { Name : "b6bd5ce9-3614-41a8-9752-0e3edb1e61e0.jpg", Width : 960, Height : 720},
        { Name : "b6e8a442-2a4e-48db-bcca-8c0bc9158cea.jpg", Width : 480, Height : 720},
        { Name : "b990a98f-2d73-4ee5-9285-42ac4d876ae6.jpg", Width : 960, Height : 622},
        { Name : "b9fcd1ba-c2e8-425c-97b1-af6d33cf9426.jpg", Width : 717, Height : 720},
      ]
    }
  ];

  function follow(username) {
    console.log('Following ' + username);
  }

  function a11yProps(index: any) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  return (
    <Main>
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered >
        <Tab label={t('discover:art')} {...a11yProps(t('discover:art'))} />
        <Tab label={t('discover:artists')} {...a11yProps(t('discover:artists'))} />
      </Tabs>
      <Box p={1}>
        <TabPanel value={activeTab} index={0}>
          <DiscoverArt></DiscoverArt>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <DiscoverArtists artists={artists} onFollowClick={follow}></DiscoverArtists>
        </TabPanel>
      </Box>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      ...await serverSideTranslations(locale, ['header', 'common', 'discover', 'tags']),
    }
  };
}
