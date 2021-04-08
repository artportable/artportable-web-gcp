import Image from 'next/image'
import { useRouter } from 'next/router'
import Main from '../app/components/Main/Main'
import { Tabs, Tab } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import ProfileComponent from '../app/components/Profile/Profile'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { useTranslation } from "next-i18next"
import { profileStyles } from '../styles/[username]'
import { useGetArtworks } from '../app/hooks/dataFetching/Artworks'
import { useGetUserProfile } from '../app/hooks/dataFetching/useGetUserProfile'
import { useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation(['common']);
  const s = profileStyles();

  const [tabValue, setTabValue] = useState(0);

  const artworks = useGetArtworks('857ce515-b7dd-4eae-991b-20468cf33ec3');
  const userProfile = useGetUserProfile('857ce515-b7dd-4eae-991b-20468cf33ec3');
  const { username } = router.query;
  const bucketUrl = 'https://artportable-images.s3.eu-north-1.amazonaws.com/Images/'; // TODO: Fetch from config

  function handleTabChange(_, newValue) {
    setTabValue(newValue);
  }

  return (
    <>
      <div className={s.profileCoverPhoto}>        
        {artworks.isLoading && <div>Loading...</div>}
        {!artworks.isLoading && !artworks.isError && artworks &&
          <Image
            src={`${bucketUrl}${artworks.data[0].PrimaryFile}`}
            alt="Cover image"
            layout="fill"
            objectFit="cover"
          />
        }
        {artworks.isError && <div>error...</div>}
      </div>
      <Main>
        <div className={s.profileGrid}>
          <div className={s.profileSummary}>
            <ProfileComponent userProfile={userProfile}></ProfileComponent>
          </div>
          <Divider className={s.divider}></Divider>
          <div className={s.tabsContainer}>
            <Tabs value={tabValue} onChange={handleTabChange} centered >
              <Tab label={t('portfolio')} />
              <Tab label={t('aboutMe')} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <div className={s.portfolioContainer}>
                {artworks.isLoading && <div>Loading...</div>}
                {!artworks.isLoading && !artworks.isError && artworks.data &&
                  artworks.data?.map(artwork =>
                    <div style={{width: "260px", height: "260px", position: "relative"}}>
                      <Image 
                        key={artwork.PrimaryFile}
                        src={`${bucketUrl}${artwork.PrimaryFile}`}
                        layout="fill"
                        objectFit="contain"
                         />
                    </div>
                  )
                }
                {artworks.isError && <div>error...</div>}
              </div>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>Om mig</TabPanel>
          </div>
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'feed']),
    }
  }
}