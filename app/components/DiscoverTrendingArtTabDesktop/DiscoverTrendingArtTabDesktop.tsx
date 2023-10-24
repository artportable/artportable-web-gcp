import { useTranslation } from 'next-i18next'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { TokenContext } from '../../contexts/token-context'
import { useGetTags } from '../../hooks/dataFetching/Artworks'
import usePostLike from '../../hooks/dataFetching/usePostLike'
import { useInfiniteScrollWithKey } from '../../hooks/useInfiniteScroll'
import { useRedirectToLoginIfNotLoggedIn } from '../../hooks/useRedirectToLoginIfNotLoggedIn'
import { Artwork } from '../../models/Artwork'
import DiscoverArt from '../DiscoverArt/DiscoverArt'
import { TAGS } from '../DiscoverTrendingArtTab/tags'
import { styles } from './discoverTrendingArtTabDesktop.css'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ClearIcon from '@mui/icons-material/Clear'
import Divider from '@mui/material/Divider';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { ListItemButton } from '@mui/material'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';



interface DiscoverTrendingArtTabProps {
    username?: string
    socialId?: string
    rowWidth: number
    loadMore: boolean
    loadImages: any
    stopLoadImages: any
    activeTab: number
}

const DiscoverTrendingArtTab = memo((props: DiscoverTrendingArtTabProps) => {
    const { t } = useTranslation(['header', 'common', 'support'])
    const s = styles()
    const { username, socialId, rowWidth } = props
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const [searchQuery, setSearchQuery] = useState<string>()
    const loadMoreArtworksElementRef = useRef(null)
    const tags = useGetTags()
    const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn()
    const token = useContext(TokenContext)
    const { like } = usePostLike()

    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
    const [selectedTrending, setSelectedTrending] = useState<string | null>(null)
    const [selectedOrientation, setSelectedOrientation] = useState<string | null>(
        null
    )

    const [trendingExpanded, setTrendingExpanded] = useState(false);
    const [techniqueExpanded, setTechniqueExpanded] = useState(false);
    const [orientationExpanded, setOrientationExpanded] = useState(false);
    const [sizeExpanded, setSizeExpanded] = useState(false);
    const [priceExpanded, setPriceExpanded] = useState(false);


    const handleSizeChange = (newSize) => {
        setSelectedSize(newSize)
    }

    const handlePriceChange = (newPrice: string) => {
        setSelectedPrice(newPrice)
    }


    const handleTrendingChange = (value: string) => {
        setSelectedTrending(String(value));
    };

    const handleOrientationChange = (value: string) => {
        setSelectedOrientation(value)
    }




    function filter(tags: string[], searchQuery = '') {
        props.loadImages()
        setSelectedTags(tags)
        setSearchQuery(searchQuery)
    }



    function likeArtwork(artworkId, isLike) {
        redirectIfNotLoggedIn()
        like(artworkId, isLike, socialId, token)
    }

    const handleTagChange = (newTag: string) => {
        if (selectedTags.length < 4 && !selectedTags.includes(newTag)) {
            setSelectedTags((prevTags) => [...prevTags, newTag])
        }
    }



    const removeTag = (tagToRemove: string) => {
        setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove))
        const storedFilters = JSON.parse(localStorage.getItem('filters')) || {
            tags: []
        }
        const updatedTags = storedFilters.tags.filter((tag) => tag !== tagToRemove)
        localStorage.setItem('filters', JSON.stringify({ tags: updatedTags }))
        localStorage.removeItem('filters')
    }


    const resetFilters = () => {
        setSelectedTags([])
        setSelectedOrientation(null)
        setSelectedSize(null)
        setSelectedPrice(null)
        setSelectedTrending(null)
    }

    const isFilterActive = () => {
        return (
            selectedTags.length > 0 ||
            selectedOrientation !== null ||
            selectedSize !== null ||
            selectedPrice !== null ||
            selectedTrending !== null
        )
    }



    const [loading, setLoading] = useState(false)
    const { data: artworks, isLoading: isLoadingArtWorks } =
        useInfiniteScrollWithKey<Artwork>(
            loadMoreArtworksElementRef,
            (pageIndex, previousPageData) => {
                if (loading && !props.loadMore) {
                    props.loadImages()
                    setLoading(false)
                }
                if (previousPageData && !previousPageData.next) {
                    props.stopLoadImages()
                    setLoading(true)
                    return null
                }


                let url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`)


                selectedTags.forEach((tag) => {
                    if (tag) {
                        url.searchParams.append('tag', tag)
                    }
                })

                if (selectedOrientation) {
                    url.searchParams.append('orientation', selectedOrientation)
                }
                if (selectedSize) {
                    url.searchParams.append('sizeFilter', selectedSize)
                }
                if (selectedPrice) {
                    url.searchParams.append('priceFilter', selectedPrice)
                }
                if (searchQuery) {
                    url.searchParams.append('q', searchQuery)
                }
                if (username && username != '') {
                    url.searchParams.append('myUsername', username)
                }

                url.searchParams.append('pageSize', '20')

                url.searchParams.append('page', (pageIndex + 1).toString())
                if (selectedTrending) {
                    url.searchParams.append('likesSince', `-${selectedTrending}`)
                }

                return url.href
            },
            username
        )



    useEffect(() => { }, [artworks])
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (

        <>
            <div className={s.desktopContainer}>
                <div>
                    <Accordion elevation={0} className={s.filter} expanded={trendingExpanded} onClick={() => setTrendingExpanded(!trendingExpanded)}>
                        <AccordionSummary aria-controls='' expandIcon={<ExpandMoreIcon />}>
                            <TrendingUpIcon className={s.filterIcon}></TrendingUpIcon>
                            <Typography className={s.filterSummary}>
                                {selectedTrending ? t(`common:selectOptions:trending${selectedTrending}`) : (t('common:selectOptions:trending'))}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={s.filterDetails}>
                            <ListItemButton className={s.filterItem} onClick={() => handleTrendingChange('7')}>{t('common:selectOptions:trending7')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleTrendingChange('14')}>{t('common:selectOptions:trending14')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleTrendingChange('30')}>{t('common:selectOptions:trending30')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleTrendingChange('90')}>{t('common:selectOptions:trending90')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleTrendingChange('365')}>{t('common:selectOptions:trending365')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleTrendingChange('2000')}>{t('common:selectOptions:trending2000')}</ListItemButton>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div>
                    <Accordion elevation={0} className={s.filter} expanded={techniqueExpanded} onClick={() => setTechniqueExpanded(!techniqueExpanded)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <ColorLensOutlinedIcon className={s.filterIcon}></ColorLensOutlinedIcon>
                            <Typography className={s.filterSummary}>
                                {t('common:selectOptions:technique')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={s.filterDetailsTags}>
                            {Object.keys(TAGS).map((key) => (
                                <div>
                                    <ListItemButton className={s.filterItemTags} onClick={() => handleTagChange(`${key}`)} key={key}>
                                        {t(`common:techniques:${key}`)}
                                    </ListItemButton>
                                    <Divider />
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div>
                    <Accordion elevation={0} className={s.filter} expanded={orientationExpanded} onClick={() => setOrientationExpanded(!orientationExpanded)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <AspectRatioIcon className={s.filterIcon}></AspectRatioIcon>
                            <Typography className={s.filterSummary}>
                                {selectedOrientation ? (t(`common:selectOptions:${selectedOrientation}`)) : (t('common:selectOptions:format'))}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={s.filterDetails}>
                            <ListItemButton className={s.filterItem} onClick={() => handleOrientationChange('Vertical')}> {t('common:selectOptions:Vertical')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleOrientationChange('Horizontal')}> {t('common:selectOptions:Horizontal')}</ListItemButton>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div>
                    <Accordion elevation={0} className={s.filter} expanded={sizeExpanded} onClick={() => setSizeExpanded(!sizeExpanded)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <PhotoSizeSelectLargeIcon className={s.filterIcon}></PhotoSizeSelectLargeIcon>
                            <Typography className={s.filterSummary}>
                                {selectedSize ? (t(`common:selectOptions:${selectedSize}`)) : (t('common:selectOptions:size'))}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={s.filterDetails}>
                            <ListItemButton className={s.filterItem} onClick={() => handleSizeChange('30')}>{t('common:selectOptions:30')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleSizeChange('60')}> {t('common:selectOptions:60')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleSizeChange('100')}>{t('common:selectOptions:100')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handleSizeChange('101')}> {t('common:selectOptions:101')}</ListItemButton>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div>
                    <Accordion disableGutters={true} elevation={0} className={s.filter} expanded={priceExpanded} onClick={() => setPriceExpanded(!priceExpanded)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <CreditCardOutlinedIcon className={s.filterIcon}></CreditCardOutlinedIcon>
                            <Typography className={s.filterSummary}>
                                {selectedPrice ? (t(`common:selectOptions:${selectedPrice}`)) : (t('common:selectOptions:price'))}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={s.filterDetails}>
                            <ListItemButton className={s.filterItem} onClick={() => handlePriceChange('500')}>{t('common:selectOptions:500')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handlePriceChange('1000')}>{t('common:selectOptions:1000')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handlePriceChange('5000')}>{t('common:selectOptions:5000')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handlePriceChange('3000')}>{t('common:selectOptions:3000')}</ListItemButton>
                            <Divider />
                            <ListItemButton className={s.filterItem} onClick={() => handlePriceChange('5001')}>{t('common:selectOptions:5001')}</ListItemButton>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className={s.desktopActiveFilter}>
                    {isFilterActive() && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                resetFilters()
                            }}
                            variant="outlined"
                            color="secondary"
                            className={s.filterClearBtn}
                        >
                            {t('common:selectOptions:clearFilter')}
                        </Button>
                    )}
                </div>
            </div><div className={s.selectedTagWrapper}>
                {selectedTags.map((tag, index) => (
                    <div key={index}>
                        <div
                            className={s.selectedTagsDesktop}
                            onClick={(e) => {
                                e.stopPropagation()
                                removeTag(tag)
                            }}
                        >
                            <Typography>
                                {t('common:techniques:' + `${tag}`)}
                            </Typography>
                            <span className={s.removeTagButton}>
                                <ClearIcon></ClearIcon>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <DiscoverArt
                artworks={artworks}
                tags={tags?.data}
                onFilter={filter}
                onLike={likeArtwork}
                rowWidth={rowWidth}
                loadMoreElementRef={loadMoreArtworksElementRef}
                isLoading={isLoadingArtWorks}
                loadMore={props.loadMore}
                activeTab={props.activeTab}
            />
        </>
    )
})

export default DiscoverTrendingArtTab