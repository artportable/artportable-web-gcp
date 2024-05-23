import { isAfter, startOfDay, sub } from "date-fns";
import { config } from '../../config';

async function sendInformFollowersEmail(token, data, username, artistEmail) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!artistEmail) return;
  
  // Fetch artist. Newly created artwork has no Owner data.
  // Fetch with api/profile/username so result has EmailInformedFollowersDate
  const artistEndpoint = `${apiBaseUrl}/api/profile/${username}`
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
  
  if (!artist) return;
  const fullName = `${artist.Name} ${artist.Surname}`;
  
  // Only send max one artwork uploaded email per day per artist.
  // In artworks api, also checks that a user does not get more than one follower email per day, even if they follow multiple artists.
  const emailInformedFollowersDate = artist?.EmailInformedFollowersDate;
  // If artist was already emailed today, return.
  const startOfToday = startOfDay(new Date());
  // Is the first date after the second one:
  if (emailInformedFollowersDate && isAfter(new Date(emailInformedFollowersDate), startOfToday)) {
    console.log('Followers already received email today.');
    return;
  } else {
    console.log('Followers not emailed today.');
  }

  // Update artist with send-date.
  let updatedArtist = null;
  let nowDate = new Date();
  const params = {
    'EmailInformedFollowersDate': nowDate.toISOString(),
  }
  try {
    updatedArtist = await updateUser(params, username, token);
  } catch(err) {
    console.error('updateUser failed in sendInformFollowersEmail:', err);
    return;
  }
  
  
  // Fetch followers
  let endpoint = `${apiBaseUrl}/api/user/${username}/followers`

  // Fetch test followers
  // if (username === 'larsf' && apiBaseUrl === 'http://localhost:5001') endpoint = `${apiBaseUrl}/api/user/erikart/followers`
  
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

  // Remove followers who do not want artwork added emails.
  followers = followers.filter(follower => follower.Email && follower.EmailDeclinedArtworkUpload !== true);
  if (followers.length < 1) {
    return;
  }
  const receivers = followers.map(follower => follower.Email)

  const imageURL = config.BUCKET_URL + data.PrimaryFile.Name
  const webbURL = config.WEBB_URL + '/art/' + data.Id
  // Only for not getting any more of these emails, will not unfollow the artist.
  const unsubscribeURL = config.WEBB_URL + '/notifications?type=artwork';
  
  const artwork = {...data, ...{
    ArtistName: fullName,
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

  return mailResult;
}

const updateUser = async (params, username, token) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const updateUserEndpoint = `${apiBaseUrl}/api/profile/${username}`;
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
      if (res.ok) {
        return res.clone().json()
      } else {
        throw(res.statusText)
      }
    })
    .then((response) => {
      // console.log('updateUserEndpoint response', response);
      updatedUser = response;
    })
  } catch(err) {
    return console.error('updateUser failed in emailUtil:', err);
  }

  return updatedUser;
}

export {
  sendInformFollowersEmail, updateUser,
}