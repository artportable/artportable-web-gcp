import { config } from '../../config';
import { isAfter, startOfDay, sub } from "date-fns";

async function sendInformFollowersEmail(data, token) {
  console.log('sendInformFollowersEmail', data);
  // console.log('config.ENVIRONMENT', config.ENVIRONMENT);

  // public DateTime EmailInformedFollowersDate { get; set; }   // For artists, when informing followers that a new artwork was uploaded.
  // public bool EmailReceiveArtworkUploaded { get; set; }  // For user, if they have not declined to receive email when a new artwork is uploaded.
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const userName = data?.Owner?.Username;
  const artistEmail = data?.Owner?.Email;
  const emailInformedFollowersDate = data?.Owner?.EmailInformedFollowersDate;
  if (!artistEmail) return;
  
  // If artist was already emailed today, return.
  const startOfToday = startOfDay(new Date());
  // Is the first date after the second one:
  if (emailInformedFollowersDate && isAfter(new Date(emailInformedFollowersDate), startOfToday)) {
    console.log('Followers already received email today.');
    return;
  } else {
    console.log('Followers not emailed today.');
  }

  // TODO:
  // Update artist with send-date.
  // artist.followersEmailedDate
  let updatedArtist = null;
  const params = {
    'ReceivedLikeMailDate': new Date(),
  }
  try {
    // updatedArtist = await updateUser(params, userName, token);
  } catch(err) {
    console.error(err)
    // If followers emailed data can not be set on artist, don't send emails.
    return;
  }
  console.log('updatedArtist', updatedArtist);

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
  console.log('followers before', followers);
  followers = followers.filter(follower => follower.EmailReceiveArtworkUploaded);
  console.log('followers after', followers);
  
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

async function sendArtworkLikedEmail(data, likedByUser, token) {
  console.log('sendArtworkLikedEmail', data);
  // If user is not logged in.
  if (!likedByUser) return;
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const artistEmail = data?.Owner?.Email;
  const emailReceiveLike = data?.Owner?.EmailReceiveLike;
  const emailReceivedLikeDate = data?.Owner?.EmailReceivedLikeDate;
  console.log('artistEmail', artistEmail);
  if (!artistEmail || !emailReceiveLike) return;

  const startOfToday = startOfDay(new Date());
  // Is the first date after the second one:
  if (emailReceivedLikeDate && isAfter(new Date(emailReceivedLikeDate), startOfToday)) {
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
  const mailEndpoint = `${config.ARTWORKS_API_BASE}/artportable/artwork-liked-ap`;
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

const updateUser = async (params, userName = 'larsf', token) => {
  console.log('UPDATE ARTIST');
  console.log('params', params);
  console.log('userName', userName);
  console.log('has token', !!token);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log('apiBaseUrl', apiBaseUrl);

  const updateUserEndpoint = `${apiBaseUrl}/api/profile/${userName}`;
  let updatedUser = null;
  try {
    await fetch(updateUserEndpoint,
      {
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "PUT",
      })
    .then((res) => {
      console.log('RES', res);
      
      return res.clone().json()
    })
    .then((response) => {
      console.log('updateUserEndpoint response', response);
      updatedUser = response;
    })
  } catch(err) {
    return console.error('updateUser failed in emailUtil:', err);
  }

  return updatedUser;
}

export {
  sendInformFollowersEmail, sendArtworkLikedEmail, updateUser,
}