import Image from 'next/image'
import { useRouter } from 'next/router'
import Main from '../app/components/Main/Main'
import ProfileComponent from '../app/components/Profile/Profile'
import { profileStyles } from '../styles/[username]'
import { useGetArtworks } from '../app/hooks/dataFetching/Artworks'
import { useGetUserProfile } from '../app/hooks/dataFetching/useGetUserProfile'


export default function Profile() {
  const router = useRouter();
  const s = profileStyles();
  const { artworks, isLoading: artworksIsLoading, isError: artworksIsError } = useGetArtworks();
  const { data: profile, isLoading: profileIsLoading, isError: profileIsError } = useGetUserProfile('857ce515-b7dd-4eae-991b-20468cf33ec3');
  const { username } = router.query;
  const bucketUrl = 'https://artportable-images.s3.eu-north-1.amazonaws.com/Images/'; // TODO: Fetch from config

  return (
    <>
      <div className={s.profileCoverPhoto}>        
        {artworksIsLoading && <div>Loading...</div>}
        {!artworksIsLoading && !artworksIsError && artworks &&
          <Image
            src={`${bucketUrl}${artworks[0].PrimaryFile}`}
            alt="Cover image"
            layout="fill"
            objectFit="cover"
          />
        }
        {artworksIsError && <div>error...</div>}
      </div>
      <Main>
        <div className={s.profileGrid}>
          <div className={s.profileSummary}>
            {!profileIsLoading && !profileIsError &&
              <ProfileComponent userProfile="857ce515-b7dd-4eae-991b-20468cf33ec3"></ProfileComponent>
            }
          </div>
        </div>
      </Main>
    </>
  );
}