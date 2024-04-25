import { config } from '../../config';
import { compareAsc, startOfDay, sub } from "date-fns";

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

  // console.log('Fetched artist:', artist);
  
  // return;
  

  const artistEmail = artist?.Email;  
  if (!artistEmail) return;

  // console.log('compareAsc', compareAsc);
  
  // artist['followersEmailedDate'] = new Date();
  // console.log('Artist with date:', artist);

  // console.log('artist.followersEmailedDate', artist.followersEmailedDate);
  // console.log('startOfToday', startOfToday);
  // console.log('yesterday', yesterday);
  
  // TODO: Use a real value.
  // const followersAlreadyEmailedToday = false;
  
  // const yesterday = sub(new Date(), { days: 1 })
  // console.log('After start of day', compareAsc(artist.followersEmailedDate, startOfToday));
  // console.log('Yesterady before start of today', compareAsc(yesterday, startOfToday));
  
  const startOfToday = startOfDay(new Date());
  // If date 1 is after date 2:
  if (artist.followersEmailedDate && compareAsc(startOfToday, artist.followersEmailedDate)) {
    console.log('Followers already received email today.');
    return;
  } else {
    console.log('Followers not emailed today.');
  }

  // TODO:
  // Update artist with send-date in artportable api.
  // artist.followersEmailedDate
  let updatedArtist = null;
  try {
    updatedArtist = await updateUser(userBody, userName, token);
  } catch(err) {
    console.error(err)
    // If followers emailed data can not be set on artist, don't send emails.
    return;
  }
  console.log('updatedArtist', updatedArtist);

  return { test: true }

  // Fetch followers
  let endpoint = `${apiBaseUrl}/api/user/${userName}/followers`

  // Fetch test followers:
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

  const startOfToday = startOfDay(new Date());
  // If date 1 is after date 2:
  if (artist.likeEmailedDate && compareAsc(startOfToday, artist.likeEmailedDate)) {
    console.log('Artist already received like-email today.');
    return;
  } else {
    console.log('Artist not emailed today.');
  }

  // TODO:
  // Update artist with send-date in artportable api.
  // artist.followersEmailedDate
  let updatedArtist = null;
  try {
    // updatedArtist = await updateUser(userBody, userName, token);
  } catch(err) {
    console.error(err)
    // If like emailed data can not be set on artist, don't send emails.
    return;
  }
  console.log('updatedArtist', updatedArtist);
  // TODO:
  // Update artist with received-like-mail-date in artportable api.

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

const updateUser = async (params = userBody, userName = 'larsf', token) => {
  console.log('UPDATE ARTIST');
  console.log('params', params);
  console.log('userName', userName);
  console.log('token', token);

  return { name: 'Kalle' }  
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log('apiBaseUrl', apiBaseUrl);
  // CoverPhotoFileId = 91,
  const update = {
    cover_photo_file_id: 91,
  }

  const updateUserEndpoint = `${apiBaseUrl}/api/profile/${userName}`
  try {
    await fetch(updateUserEndpoint,
      {
        // body: JSON.stringify(params),
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
          "Authentication": `Bearer ${token}`,
        },
        method: "PUT",
      })
    .then((res) => {
      console.log('RES', res);
      
      return res.clone().json()
    })
    .then((response) => {
      console.log('updateUserEndpoint response', response);
      // mailResult = response;
      console.log('Artist was updated.');
      return response;
    })
  } catch(err) {
    return console.error('updateUser failed in emailUtil:', err);
  }
}

export {
  sendInformFollowersEmail, sendArtworkLikedEmail, updateUser,
}