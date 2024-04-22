import { config } from '../../config';

async function sendInformFollowersEmail(data, token) {
  console.log('sendInformFollowersEmail', data);
  // console.log('config.ENVIRONMENT', config.ENVIRONMENT);
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const userName = data?.Owner?.Username;
  if (!userName) return;

  // Fetch artist
  const artistEndpoint = `${apiBaseUrl}/api/artists/${userName}`
  let artist = null;
  try {
    await fetch(artistEndpoint)
    .then((res) => res.clone().json())
    .then((response) => {
      artist = response;
    })
  } catch(err) {
    return console.error(err);
  }

  const artistEmail = artist?.Email;  
  if (!artistEmail) return;

  // TODO: Use a real value.
  const followersAlreadyEmailedToday = false;
  if (followersAlreadyEmailedToday) {
    return;
  }

  // TODO:
  // Update artist with send-date in artportable api.
  let updatedArtist = {}
  try {
    // updatedArtist = updateArtist(userBody, userName, token);
  } catch(err) {
    console.error(err)
    // If followers emailed data can not be set on artist, don't send emails.
    return;
  }

  // Fetch followers
  let endpoint = `${apiBaseUrl}/api/user/${userName}/followers`

  if (userName === 'larsf' && apiBaseUrl === 'http://localhost:5001') endpoint = `${apiBaseUrl}/api/user/erikart/followers`
  
  let followers = [];
  try {
    await fetch(endpoint)
    .then((res) => res.clone().json())
    .then((result) => {
      followers = result;
    })
  } catch(err) {
    return console.error(err);
  }

  // TODO:
  // Remove followers who do not want any emails.

  console.log('followers', followers);
  
  if (followers.length < 1) {
    return;
  }

  const receivers = followers.map(follower => follower.Email)

  const imageURL = config.BUCKET_URL + data.PrimaryFile.Name
  const webbURL = config.WEBB_URL + '/art/' + data.Id
  // Only for not getting any more of these emails, will not unfollow the artist.
  const unsubscribeURL = config.WEBB_URL + '/notifications?type=artwork';
  
  const artwork = {...data, ...{
    ImageURL: imageURL,
    WebbURL: webbURL,
    UnsubscribeURL: unsubscribeURL,
  }}
  
  // Send email to followers
  const mailEndpoint = `${config.ARTWORKS_API_BASE}/artportable/inform-followers-ap`
  
  let mailResult = null;
  try {
    await fetch(mailEndpoint,
      {
        body: JSON.stringify({ artwork, receivers, artistEmail }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
    .then((res) => res.clone().json())
    .then((response) => {
      mailResult = response;
    })
  } catch(err) {
    return console.error(err);
  }
  // console.log('mailResult', mailResult);
  
  console.log('emailUtil sendInformFollowersEmail mailResult:', mailResult);

  return mailResult;
}

async function sendArtworkLikedEmail(data, likedByUser) {
  console.log('sendArtworkLikedEmail', data);
  // If user is not logged in.
  if (!likedByUser) return;
  
  const userName = data?.Owner?.Username;
  if (!userName) return;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch artist
  let endpoint = `${apiBaseUrl}/api/artists/${userName}`
  let artist = null;
  try {
    await fetch(endpoint)
    .then((res) => res.clone().json())
    .then((result) => {
      artist = result;
    })
  } catch(err) {
    return console.error(err);
  }

  const artistEmail = artist?.Email;  
  if (!artistEmail) return;

  const imageURL = config.BUCKET_URL + data.PrimaryFile.Name
  const webbURL = config.WEBB_URL + '/art/' + data.Id
  const unsubscribeURL = config.WEBB_URL + '/notifications?type=like';

  const artwork = {...data, ...{
    ImageURL: imageURL,
    WebbURL: webbURL,
    UnsubscribeURL: unsubscribeURL,
    LikedByUser: likedByUser,
  }}
  
  // Send email to artist
  const mailEndpoint = `${config.ARTWORKS_API_BASE}/artportable/artwork-liked-ap`
  let mailResult = null;
  try {
    await fetch(mailEndpoint,
      {
        body: JSON.stringify({ artwork, artistEmail, likedByUser }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      .then((res) => res.clone().json())
      .then((response) => {
        mailResult = response;
        
      })
    } catch(err) {
      return console.error(err);
    }
    
  console.log('emailUtil sendArtworkLikedEmail mailResult:', mailResult);

  // TODO:
  // Update artist with received-like-mail-date in artportable api.

  return mailResult;
}

const userBody = {
  "Username": "larsf",
  "ProfilePicture": null,
  "CoverPhoto": null,
  "Name": "Larsson",
  "Surname": "Fängstan",
  "Headline": "Rubrik är den här",
  "Title": "Titeln är den här",
  "Location": "Söder",
  "Country": "Sweden",
  "State": "Stockholm County",
  "City": "Boo",
  "About": "Min biografi\nNy rad här\nJag är en stor konstnär\nMycket berömd",
  "InspiredBy": "Natiren",
  "Studio": null,
  "SocialMedia": {
    "Website": "",
    "Instagram": "https://www.instagram.com/sa",
    "Facebook": "https://www.facebook.com/ss",
    "LinkedIn": "https://linkedin.com/lars",
    "Behance": "https://www.behance.net/as",
    "Dribble": null
  },
  "Educations": [],
  "Exhibitions": [],
  "FollowedByMe": false,
  "MonthlyArtist": false,
  "followersInformedDate": new Date()
}

const updateArtist = async (params = userBody, userName = 'larsf', token) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log('apiBaseUrl', apiBaseUrl);
  

  const updateArtistEndpoint = `${apiBaseUrl}/api/profile/${userName}`
  try {
    await fetch(updateArtistEndpoint,
      {
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          "Authentication": `Bearer ${token}`,
        },
        method: "PUT",
      })
    .then((res) => res.clone().json())
    .then((response) => {
      console.log('updateArtistEndpoint response', response);
      // mailResult = response;
      console.log('Artist was updated.');
      return response;
    })
  } catch(err) {
    return console.error(err);
  }
}

export {
  sendInformFollowersEmail, sendArtworkLikedEmail,
}