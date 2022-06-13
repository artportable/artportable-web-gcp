import React, { useContext, useEffect, useState } from "react";
import Head from 'next/head';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Main from "../../app/components/Main/Main";
import { useGetArtwork } from "../../app/hooks/dataFetching/Artworks";
import { Badge, Box, IconButton, Paper, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { styles } from "../../styles/art.css";
import { capitalizeFirst, fetchWithTimeout } from "../../app/utils/util";
import Button from "../../app/components/Button/Button";
import AvatarCard from "../../app/components/AvatarCard/AvatarCard";
import FavoriteIcon from '@material-ui/icons/Favorite';
import TagChip from "../../app/components/TagChip/TagChip";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import Link from "next/link";
import { TokenContext } from "../../app/contexts/token-context";
import { UserContext } from "../../app/contexts/user-context";
import { useRedirectToLoginIfNotLoggedIn } from "../../app/hooks/useRedirectToLoginIfNotLoggedIn";
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../app/utils/googleAnalytics';
import { UrlObject } from "url";
import PurchaseRequestDialog from '../../app/components/PurchaseRequestDialog/PurchaseRequestDialog';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import usePostLike from "../../app/hooks/dataFetching/usePostLike";
import usePostFollow from "../../app/hooks/dataFetching/usePostFollow";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import ChatIcon from '@material-ui/icons/Chat';
import { RWebShare } from "react-web-share";
import ShareIcon from '@material-ui/icons/Share';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

export default function ArtworkPage(props) {
  const s = styles();
  const { t } = useTranslation(['art', 'common', 'tags']);
  const router = useRouter();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const staticArtwork = props.artwork;
  const navBarItems = props.navBarItems;
  const canonicalURL = publicUrl + router.asPath;

  const { id } = router.query
  const { username, socialId } = useContext(UserContext);
  const artwork = useGetArtwork(id as string, username.value);
  const token = useContext(TokenContext);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();

  const { like } = usePostLike();
  const { follow } = usePostFollow();

  const [isFollowed, setFollow] = useState(artwork?.data?.Owner?.FollowedByMe); // TODO: Fetch and initialize with FollowedByMe
  const [isLiked, setIsLiked] = useState(artwork?.data?.LikedByMe);

  const { isSignedIn } = useContext(UserContext);

  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] = useState(false);

  const formatter = new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    setFollow(artwork?.data?.Owner?.FollowedByMe);
  }, [artwork?.data?.Owner?.FollowedByMe]);

  useEffect(() => {
    setIsLiked(artwork?.data?.LikedByMe);
  }, [artwork?.data]);

  function togglePurchaseRequestDialog() {
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen)
  }

  function purchaseRequest(originalRedirect?: UrlObject | string) {
    // if (isSignedIn.value) {
    //   if (originalRedirect !== undefined) {
    //     router.push(originalRedirect);
    //   }
    // } else {
    togglePurchaseRequestDialog();
  }
  // }

  function toggleFollow() {
    redirectIfNotLoggedIn();
    follow(artwork.data.Owner.SocialId, !isFollowed, socialId.value, token);
    setFollow(!isFollowed);
  }

  function likeArtwork(isLike) {
    redirectIfNotLoggedIn();
    like(artwork.data.Id, isLike, socialId.value, token);
  }

  function toggleLike(event) {
    event.stopPropagation();
    likeArtwork(!isLiked);
    setIsLiked(!isLiked);
    !isLiked ? artwork.data.Likes++ : artwork.data.Likes--;
    !isLiked ? trackGoogleAnalytics(ActionType.LIKE_ARTWORK, CategoryType.INTERACTIVE) : null
  }

  const likedFilled = !isSignedIn.value ?
    <FavoriteBorderOutlinedIcon color="primary" /> :
    isLiked ? <FavoriteIcon color="primary" /> : <FavoriteBorderOutlinedIcon color="primary" />;

  const hej = () => {
    console.log(artwork.data.Width)
    console.log(artwork.data.Height)
  }
  const artworkUrl = `https://beta.artportable.com/art/${artwork?.data?.Id}`
  const shareArtworkTitle = `${t('common:share')}"${artwork?.data?.Title}"`
  const shareArtworkText = `${t('common:checkThisArtwork')}"${artwork?.data?.Title}"${t('common:atArtportable')}`

  return (
    <Main wide navBarItems={navBarItems}>
      <Head>
        <title>{staticArtwork?.Title ?? "Artportable"}</title>
        <meta name="title" content={artwork?.data?.Owner?.Name + ' ' + artwork?.data?.Owner?.Surname ?? "Artportable"} />
        <meta name="description" content={staticArtwork?.Title ?? ""} />
        <meta property="og:title" content={artwork?.data?.Owner?.Name + ' ' + artwork?.data?.Owner?.Surname ?? "Artportable"} />
        <meta property="og:description" content={staticArtwork?.Title ?? ""} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${publicUrl}/art/${staticArtwork?.Id}`} />
        <meta property="og:image" content={`${bucketUrl}${staticArtwork?.PrimaryFile?.Name}`} />

        <link rel="canonical" href={canonicalURL} />
      </Head>
      {/* // if den prop, visa kompontent, annars visa det andra */}

      <div className={s.container}>
        <div className={s.backBtnContainer}>
          <IconButton
            onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
        </div>

        {artwork.isLoading && <div>loading...</div>}
        {artwork.isError && <div>error...</div>}

        {artwork && artwork.data &&
          <>
            <div className={s.avatar}>
            <AvatarCard user={artwork.data.Owner}></AvatarCard>
              <Button
                className={s.followButton}
                variant={!isFollowed ? "contained" : "outlined"}
                color="primary"
                startIcon={!isFollowed ? <AddIcon /> : null}
                disableElevation
                rounded
                onClick={() => { toggleFollow(); !isFollowed ? trackGoogleAnalytics(ActionType.FOLLOW_ARTWORK, CategoryType.INTERACTIVE) : null }}>
                {capitalizeFirst(
                  !isFollowed ?
                    t('common:words.follow') :
                    t('common:words.following')
                )}
              </Button>
            </div>
            <Paper classes={{ root: s.paper }}>
              <div className={s.imageContainer}>
                <img
                  src={`${bucketUrl}${artwork.data.PrimaryFile.Name}`}
                  className={s.primaryImage}
                />
              </div>
              <div className={s.infoBar}>
                <div className={s.infoContainer}>
                  <div className={s.titleAndSizeContainer}>
                    {artwork.data.Title &&
                      <span>{artwork.data.Title}</span>
                    }
                    {artwork.data.MultipleSizes ?
                      ' (' + t('common:words.multipleSizes').toLowerCase() + ')' :
                      artwork.data.Width && artwork.data.Height && artwork.data.Depth ?
                        ' (' + artwork.data.Width + 'x' + artwork.data.Height + 'x' + artwork.data.Depth + 'cm)' :
                        artwork.data.Width && artwork.data.Height ?
                          ' (' + artwork.data.Width + 'x' + artwork.data.Height + 'cm)' :
                          null
                    }
                  </div>
                  <div className={s.priceContainer}>
                    {artwork.data.SoldOut ?
                      <><div className={s.soldMark} />{t('common:words.sold')} </> :
                      artwork.data.Price && artwork.data.Price != "0" ?
                        <span>{formatter.format(artwork.data.Price)} </span> :
                        <span>{t('priceOnRequest')}</span>
                    }
                  </div>
                  {username.value !== artwork.data.Owner.Username && !artwork.data.SoldOut &&
                    <Box>
                      <Button
                        className={s.purchaseRequestButton}
                        variant="contained"
                        color="primary"
                        rounded
                        disableElevation
                        onClick={() => {
                          purchaseRequest({
                            pathname: "/messages",
                            query: {
                              artwork: encodeURIComponent(JSON.stringify({
                                title: artwork.data.Title,
                                creator: artwork.data.Owner.Username,
                                url: window.location.href
                              })),
                              referTo: artwork.data.Owner.SocialId
                            }
                          });
                          trackGoogleAnalytics(ActionType.PURCHASE_REQUEST_ARTWORK, CategoryType.BUY);
                        }}
                        startIcon={<SendIcon color={"inherit"} />}>
                        {capitalizeFirst(t('common:purchaseRequest'))}
                      </Button>
                      <PurchaseRequestDialog
                        open={purchaseRequestDialogOpen}
                        onClose={togglePurchaseRequestDialog}
                        props={{
                          pathname: "/messages",
                          title: artwork.data.Title,
                          creator: artwork.data.Owner.Username,
                          url: window.location.href,
                          referTo: artwork.data.Owner.SocialId,
                          imageUrl: bucketUrl + artwork.data.PrimaryFile.Name
                        }}
                      />
                    </Box>
                  }
                </div>
                <div className={s.flexLikeRoom}>
                  <div className={s.flexMessageLike}>
                    <RWebShare
                      data={{
                        text: shareArtworkText,
                        url: artworkUrl,
                        title: shareArtworkTitle,
                      }}
                      onClick={() => trackGoogleAnalytics(ActionType.SHARE_ARTWORK) }
                    >
                      <IconButton className={s.shareButton} >
                      <ShareIcon style={{ fontSize: '21px' }} />
                      </IconButton>
                    </RWebShare>
                    <div title={t('common:sendMessage')}>
                      <a>
                        <IconButton className={s.chatButton} aria-label="account" onClick={() => {
                          redirectIfNotLoggedIn({
                            pathname: "/messages",
                            query: {
                              referTo: artwork.data.Owner.SocialId
                            }
                          });
                          trackGoogleAnalytics(ActionType.SEND_MESSAGE, CategoryType.INTERACTIVE)
                        }}>
                          <ChatBubbleOutlineIcon style={{ fontSize: '23px' }} />
                        </IconButton>
                      </a>
                    </div>
                    <div>
                      <IconButton
                        className={s.likeButton}
                        disableRipple
                        disableFocusRipple
                        onClick={toggleLike}>
                        {likedFilled}
                      </IconButton>
                    </div>
                    <div className={s.likeCounter}>
                      {artwork.data.Likes > 0 &&
                        <div>{artwork.data.Likes}</div>
                      }
                    </div>
                  </div>
                  {artwork.data.Width > 0 && artwork.data.Height > 0 &&
                    <div className={s.roomDiv}>
                      <a href={`/tool/${artwork.data.Id}`}>
                        <Badge badgeContent={t('new')} className={s.badgeNew}>
                          <Button
                            className={s.roomButton}
                            rounded>
                            {t('room')}
                          </Button>
                        </Badge>
                      </a>
                    </div>
                  }
                </div>
              </div>
              <Box textAlign="center" marginY={4} className={s.text}>
                {artwork.data.Title &&
                  <Typography variant="h3" component="h2" id="artwork-modal-title">
                    <Box fontWeight="500" fontFamily="LyonDisplay" marginBottom={2}>
                      {artwork.data.Title}
                    </Box>
                  </Typography>
                }
                {artwork.data.Description &&
                  <Typography variant="body1" id="artwork-modal-description">
                    {artwork.data.Description}
                  </Typography>
                }
              </Box>
              <Box className={s.extraImages}>
                {artwork.data.SecondaryFile &&
                  <div className={s.imageContainer}>
                    <img
                      src={`${bucketUrl}${artwork.data.SecondaryFile.Name}`}
                      className={s.extraImage}
                    />
                  </div>
                }
                {artwork.data.TertiaryFile &&
                  <div className={s.imageContainer}>
                    <img
                      src={`${bucketUrl}${artwork.data.TertiaryFile.Name}`}
                      className={s.extraImage}
                    />
                  </div>
                }
              </Box>
              <Box className={s.tagsContainer} marginBottom={2}>
                {Array.from(artwork.data.Tags).map((tag: string) => {
                  return <TagChip
                    key={tag}
                    title={tag}
                    onChipClick={null}
                    limitReached={true}
                    variant="outlined">
                  </TagChip>;
                }
                )}
              </Box>
            </Paper>
          </>
        }
      </div>
    </Main >
  );
}

export async function getServerSideProps({ locale, params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = new URL(`${apiBaseUrl}/api/artworks/${encodeURIComponent(params.id)}`);
  const navBarItems = await getNavBarItems();

  try {
    const artworkResponse = await fetch(url.href, {
      // timeout: 11000
      //fail return prop som sätts till true

    });
    const artwork = await artworkResponse.json();

    return {
      props: {
        // fetch timeout
        navBarItems: navBarItems,
        artwork,
        locale: locale,
        ...await serverSideTranslations(locale, ['header', 'footer', 'art', 'common', 'tags', 'support', 'plans']),
      }
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      // fetch timeout
      navBarItems: navBarItems,
      artwork: { Id: params.id },
      locale: locale,
      ...await serverSideTranslations(locale, ['header', 'footer', 'art', 'common', 'tags', 'support', 'plans']),
    }
  };
}
