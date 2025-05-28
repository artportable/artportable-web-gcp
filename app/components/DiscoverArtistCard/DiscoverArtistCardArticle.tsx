import React from "react";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { useGetUserProfile, useGetUserProfilePicture } from "../../hooks/dataFetching/UserProfile";
import Divider from "@mui/material/Divider";

export default function DiscoverArtistCardArticle({ artist }) {
  if (!artist) {
    return null;
  }

  // Get artist username for API calls
  const username = artist.Username;

  // Fetch profile data using hooks
  const { data: profileData, isLoading: profileLoading } = useGetUserProfile(username, null);
  const { data: profilePictureUrl, isLoading: pictureLoading } = useGetUserProfilePicture(username);

  // Get artist name
  const artistName = artist.Name && artist.Surname 
    ? `${artist.Name} ${artist.Surname}`
    : artist.Username || 'Konstnär';

  // Get profile image from hook data
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const profileImage = profilePictureUrl ? `${bucketUrl}${profilePictureUrl}` : null;

  // Get bio from profile data
  const artistBio = profileData?.Bio || 
                   profileData?.Description || 
                   profileData?.About || 
                   profileData?.Summary ||
                   null;

  // Show loading state if data is still being fetched
  if (profileLoading || pictureLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px', 
        backgroundColor: 'transparent',
        marginTop: '40px'
      }}>
        <Typography>Loading artist information...</Typography>
      </div>
    );
  }

  return (
    <>
      {/* Artist section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px', 
        backgroundColor: 'transparent',
        marginTop: '40px'
      }}>
        <Typography variant="h4" style={{ 
          marginBottom: '40px', 
          fontWeight: 'bold',
          color: '#333'
        }}>
          Mer om Konstnären
        </Typography>
        
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          margin: '0 auto 30px',
          overflow: 'hidden',
          backgroundColor: 'transparent'
        }}>
          {profileImage ? (
            <img 
              src={profileImage}
              alt={artistName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e0e0e0',
              color: '#666',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              {artistName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {artistBio && (
          <Typography style={{ 
            maxWidth: '600px', 
            margin: '0 auto 30px',
            lineHeight: '1.6',
            color: '#666'
          }}>
            {artistBio}
          </Typography>
        )}
        
        <Link href={`/profile/@${artist.Username}`}>
          <a style={{
            color: '#007bff',
            textDecoration: 'underline',
            fontSize: '16px'
          }}>
            Se mer av {artistName} i portfolion på Artportable
          </a>
        </Link>
      </div>
      <Divider style={{ width: '50%', margin: '0 auto' }} />
      {/* Call to action section */}
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography style={{ 
          marginBottom: '20px', 
          fontWeight: 'bold',
          color: '#333',
          fontSize: '22px',
          fontFamily: 'Roboto'
        }}>
          Redo att hitta konst som känns?
        </Typography>
        
        <Typography style={{ 
          marginBottom: '40px',
          color: '#666',
          width: '370px',
          margin: '0 auto',
          fontSize: '12px',
          fontFamily: 'Joan'
          
        }}>
          Låt dig inspireras av konstnärer som skapar med hjärta, själ och berättelse.
          Utforska originalkonst direkt från konstnärer på Artportable.com
        </Typography>
        
        <img 
          src="/images/ArtportableLogo.svg"
          alt="Artportable"
          style={{
            height: '120px',
            width: 'auto'
          }}
        />
      </div>
    </>
  );
}
