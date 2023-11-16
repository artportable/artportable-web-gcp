import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Main from '../../app/components/Main/Main'
import { useGetStory } from '../../app/hooks/dataFetching/Stories'
import { Box, IconButton, Paper, Typography } from '@material-ui/core'
import { styles } from '../../styles/story.css'
import { fetchWithTimeout } from '../../app/utils/util'
import AvatarCard from '../../app/components/AvatarCard/AvatarCard'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Link from 'next/link'
import { TokenContext } from '../../app/contexts/token-context'
import { UserContext } from '../../app/contexts/user-context'
import {
    ActionType,
    CategoryType,
    trackGoogleAnalytics
} from '../../app/utils/googleAnalytics'
import { UrlObject } from 'url'
import { getNavBarItems } from '../../app/utils/getNavBarItems'
import { Story } from '../../app/models/Story'

interface StoryProps {
    navBarItems: any,
    story: Story,
    locale: any
}

export default function StoryPage(props: StoryProps) {
    const s = styles()
    const { t } = useTranslation(['art', 'common', 'tags'])
    const router = useRouter()
    const publicUrl = process.env.NEXT_PUBLIC_URL
    const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const staticStory: Story = props?.story
    const navBarItems = props?.navBarItems
    const canonicalURL = publicUrl + router.asPath

    const { id } = router.query
    const { username, socialId } = useContext(UserContext)
    const storyData = useGetStory(id as string, username.value)
    const story: Story = storyData?.data;
    const date: Date = new Date(story?.Published);
    //const month: string = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    //const day: string = date.toLocaleString('default', { day: 'numeric' });

    //const token = useContext(TokenContext)

    useEffect(() => {
        console.log(staticStory);
        console.log(props);
    }, [])

    const storyUrl = `https://artportable.com/stories/${storyData?.data?.Id}`
    const shareStoryTitle = storyData?.data?.Title
        ? `${t('common:share')}"${storyData?.data?.Title}"`
        : `${t('common:share')}`
    const shareStoryText = `${t('common:checkThisArtwork')}"${storyData?.data?.Title
        }"${t('common:atArtportable')}`

    return (
        <Main wide navBarItems={navBarItems}>
            <Head>
                <title>{staticStory?.Title ?? 'Artportable'}</title>
                <meta
                    name="title"
                    content={
                        staticStory?.Name + ' ' + staticStory?.Surname ??
                        'Artportable'
                    }
                />
                <meta name="description" content={staticStory?.Title ?? ''} />
                <meta
                    property="og:title"
                    content={
                        staticStory?.Name + ' ' + staticStory?.Surname ??
                        'Artportable'
                    }
                />
                <meta property="og:description" content={staticStory?.Title ?? ''} />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={`${publicUrl}/story/${staticStory?.Id}`}
                />
                <meta
                    property="og:image"
                    content={`${bucketUrl}${staticStory?.PrimaryFile?.Name}`}
                />

                <link rel="canonical" href={canonicalURL} />
            </Head>
            {/* // if den prop, visa kompontent, annars visa det andra */}

            {/* <> */}
                {storyData.isLoading && <div>loading...</div>}
                {storyData.isError && <div>error...</div>}

                {storyData && storyData.data && (
                    <>
                        <article className={s.story}>
                            <img
                                className={s.image}
                                src={`${bucketUrl}${story.PrimaryFile.Name}`}
                                alt={`${storyData?.data.Title ? story.Title : 'story image'}`}
                            />
                            <time dateTime={date.toISOString()}className={s.published}>
                                Published: {date.toLocaleDateString()}
                            </time>
                            <div className={s.titleText}>
                                <h1 className={s.title}>{story.Title}</h1>
                                <p className={s.text}>{story.Description}</p>
                            </div>
                        </article>
                    </>
                )}
            {/* </> */}
        </Main>
    )
}

export async function getServerSideProps({ locale, params }) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const url = new URL(
        `${apiBaseUrl}/api/stories/${encodeURIComponent(params.id)}`
    )
    const navBarItems = await getNavBarItems()

    try {
        const storyResponse = await fetch(url.href, {
            // timeout: 11000
            //fail return prop som sätts till true
        })
        const story = await storyResponse.json()

        return {
            props: {
                // fetch timeout
                navBarItems: navBarItems,
                story,
                locale: locale,
                ...(await serverSideTranslations(locale, [
                    'header',
                    'footer',
                    'art',
                    'common',
                    'tags',
                    'support',
                    'plans'
                ]))
            }
        }
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            // fetch timeout
            navBarItems: navBarItems,
            story: { Id: params.id },
            locale: locale,
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'art',
                'common',
                'tags',
                'support',
                'plans'
            ]))
        }
    }
}
