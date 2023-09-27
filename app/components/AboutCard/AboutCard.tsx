import React from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { styles } from './aboutCard.css'
import RoomIcon from '@material-ui/icons/Room'
import { useTranslation } from 'next-i18next'
import SocialNetworksCard from '../SocialNetworksCard/SocialNetworksCard'
import InspiredByCard from '../InspiredByCard/InspiredByCard'
// ny

export default function AboutCard({ data, userProfilePicture, tags }) {
  const s = styles()
  const { t } = useTranslation(['profile', 'tags'])
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL

  return (
    <>
      <div className={s.mainContainer}>
        <div className={s.imgAndTextWrapper}>
          <div className={s.imgContainer}>
            {userProfilePicture && (
              <img
                className={s.profilePicture}
                src={`${bucketUrl}${userProfilePicture}`}
              ></img>
            )}
          </div>
          <div className={s.textContainer}>
            {data?.Title && <Typography>{`${data?.Title}`}</Typography>}
            <div style={{ marginBottom: '4px' }}>
              {data?.Headline && <Typography>{`${data?.Headline}`}</Typography>}
            </div>
            {data?.Location && (
              <Typography>
                <RoomIcon
                  color="primary"
                  fontSize="small"
                  style={{ color: '#da8c77' }}
                ></RoomIcon>
                {`${data?.Location}`}
              </Typography>
            )}
            <div style={{ marginTop: '5px' }}>
              {data?.SocialMedia && (
                <SocialNetworksCard
                  data={data?.SocialMedia}
                ></SocialNetworksCard>
              )}
            </div>
          </div>
        </div>
        <div className={s.bioText}>
          <b>
            {t('profile:aboutArtist')}{' '}
            <a>
              {data?.Name} {data?.Surname && data?.Surname}
            </a>
            :
          </b>
          <p></p>
          {data?.About}
          {data?.InspiredBy && (
            <InspiredByCard text={data?.InspiredBy}></InspiredByCard>
          )}
        </div>
      </div>
    </>
  )
}
