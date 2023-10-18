import { useTranslation } from 'next-i18next'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { TokenContext } from '../../contexts/token-context'
import { useGetTags } from '../../hooks/dataFetching/Artworks'
import usePostLike from '../../hooks/dataFetching/usePostLike'
import { useInfiniteScrollWithKey } from '../../hooks/useInfiniteScroll'
import { useRedirectToLoginIfNotLoggedIn } from '../../hooks/useRedirectToLoginIfNotLoggedIn'
import { Artwork } from '../../models/Artwork'
import DiscoverArt from '../DiscoverArt/DiscoverArt'
import { TAGS } from './tags'
import { styles } from './discoverTrendingArtTab.css'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { MenuItem, NativeSelect, useTheme } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RemoveIcon from '@mui/icons-material/Remove'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import ClearIcon from '@mui/icons-material/Clear'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TuneIcon from '@mui/icons-material/Tune';



interface DiscoverTrendingArtTabProps {
  username?: string
  socialId?: string
  rowWidth: number
  sold: string
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
  const [selectedTempTags, setTempSelectedTags] = useState<string[]>([])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedTempSize, setTempSelectedSize] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
  const [selectedTrending, setSelectedTrending] = useState<string | null>(null)
  const [selectedOrientation, setSelectedOrientation] = useState<string | null>(
    null
  )
  const [selectedTechnique, setSelectedTechnique] = useState<string[]>([])



  const [tempSelectedTrending, setTempSelectedTrending] = useState<string | null>(null);
  const [tempSelectedOrientation, setTempSelectedOrientation] = useState<string | null>(null);
  const [tempSelectedPrice, setTempSelectedPrice] = useState<string | null>(null)


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize)
  }

  const handlePriceChange = (newPrice: string) => {
    setSelectedPrice(newPrice)
  }

  const handleTrendingChangeMobile = (value: number) => {
    setTempSelectedTrending(String(value));
  };


  const handleTrendingChange = (value: string) => {
    setSelectedTrending(String(value));
  };

  const handleOrientationChange = (value: string) => {
      setSelectedOrientation(value)
  }

  const handleOrientationChangeMobile = (value) => {  
    setTempSelectedOrientation(String(value));
  };
  
  const handleSizeChangeMobile = (value: number) => {
    setTempSelectedSize(String(value));
  }

  const handlePriceChangeMobile = (value: any) => {
    setTempSelectedPrice(value);

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


  const handleTagChangeMobile = (newTag: string) => {
      if (selectedTempTags.length < 4 && !selectedTempTags.includes(newTag)) {
        setTempSelectedTags((prevTags) => [...prevTags, newTag])

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


  const removeTagMobile = (tagToRemove: string) => {
    setTempSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove))
  }


  const resetFilters = () => {
    setSelectedTags([])
    setSelectedOrientation(null)
    setSelectedSize(null)
    setSelectedPrice(null)
    setSelectedTrending(null)
  }


  const resetFiltersMobile = () => {
    setTempSelectedTrending(null);
    setTempSelectedTags([]);
    setTempSelectedSize(null);
    setSelectedTags([])
    setSelectedOrientation(null)
    setSelectedSize(null)
    setSelectedPrice(null)
    setSelectedTrending(null)
    setTempSelectedOrientation(null)
    setTempSelectedPrice(null)
  }

  useEffect(() => {}, [handleClose, resetFiltersMobile])

  const isFilterActive = () => {
    return (
      selectedTags.length > 0 ||
      selectedOrientation !== null ||
      selectedSize !== null ||
      selectedPrice !== null ||
      selectedTrending !== null
    )
  }


  const isFilterActiveMobile = () => {
    return (
      selectedTempTags.length > 0 ||
      selectedTempSize !== null ||
      tempSelectedTrending !== null ||
      tempSelectedOrientation !== null ||
      tempSelectedPrice !== null
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

        let url
        if (props.sold === 'Unsold') {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trendingunsold`)
        } else if (props.sold === 'Sold') {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trendingsold`)
        } else if (props.sold === 'All') {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`)
        } else {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`)
        }

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



      useEffect(() => {}, [artworks])
      const theme = useTheme()
      const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (

    <>
      {isMobile ? (
        <div style={{  marginBottom: '20px' }}>
          <Button style={{width: "100%", borderRadius: "20px",}} variant="outlined" onClick={handleClickOpen}>
                <Typography>
                Filtrera 
                </Typography>
                <TuneIcon style={{marginLeft: "5px"}} />
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            > 
                <div style={{ display: 'flex', flexDirection: 'column', width: "100%", height: '100%', backgroundColor: "#fdf9f7", overflowY: "scroll" }}>
    
              <List style={{ flexGrow: 1 }}>
                  <div style={{display: "flex", marginTop: "12px", fontSize: "20px", fontWeight: "bold", padding: "10px"}}>
                  <ListItem>
                      {t("common:selectOptions:doFilter")}
                  </ListItem>
                  <Button onClick={handleClose}>{t("common:selectOptions:close")}</Button>
                  </div>
                  <Divider style={{marginTop: "20px"}} />

                <div style={{textAlign: "center", display: "flex", flexDirection: "column"}}>
                <FormControl style={{ marginTop: "20px", alignItems: "center"}}>
                  <Accordion style={{borderRadius: "20px", width: "90%", backgroundColor: "#faf3ee"}}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel-content"
                          id="panel-header"
                      >
                      <Typography>
                              {tempSelectedTrending ? t(`common:selectOptions:trending${tempSelectedTrending}`) : t('common:selectOptions:trending')}
                      </Typography>
                      </AccordionSummary>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleTrendingChangeMobile(7)}>{t('common:selectOptions:trending')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleTrendingChangeMobile(14)}>{t('common:selectOptions:trending14')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleTrendingChangeMobile(30)}>{t('common:selectOptions:trending30')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleTrendingChangeMobile(90)}>{t('common:selectOptions:trending90')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleTrendingChangeMobile(365)}>{t('common:selectOptions:trending365')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleTrendingChangeMobile(2000)}>{t('common:selectOptions:trending2000')}</Typography>
                      </AccordionDetails>
                  </Accordion>
              </FormControl>
              <FormControl style={{ marginTop: "30px", alignItems: "center"}}>
                <Accordion style={{ borderRadius: "20px", width: "90%", alignItems: "center", backgroundColor: "#faf3ee"}}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="panel-content"
                     id="panel-header"
                     
                  >
                     <Typography>
                            { t('common:selectOptions:technique')}
                      </Typography> 
                  </AccordionSummary>
                  <div style={{maxHeight: '300px', overflowY: 'auto'}}> 
                    {Object.keys(TAGS).map((key) => (
                      <div>
                        <ListItem button onClick={() => handleTagChangeMobile(key)}>
                        {t(`common:techniques:${key}`)}
                      </ListItem>
                        <Divider/>
                      </div>
                    ))}
                  </div>

                </Accordion>
              </FormControl>
              <div className={s.selectedTagWrapper}>
                    {
                      selectedTempTags && 
                      <div className={s.selectedTagContainer}>
                           {selectedTempTags.map((tag, index) => (
                  <div key={index}>
                    <div
                      className={s.selectedTags}
                     
                    >
                      <Typography style={{fontSize: "12px", fontWeight: "lighter"}}>
                        {t('common:techniques:' + `${tag}`)}
                      </Typography>
                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          removeTagMobile(tag)
                        }}
                      >
                        <HighlightOffRoundedIcon
                          style={{
                            border: '0px solid #c67777',
                            color: '#c67777',
                            alignItems: 'center',
                            fontSize: "12px"
                          }}
                        ></HighlightOffRoundedIcon>
                      </span>
                    </div>
                  </div>
                ))}
                      </div>
                    }
              </div>

              <FormControl style={{ marginTop: "30px", alignItems: "center"}}>
                  <Accordion style={{borderRadius: "20px", width: "90%", backgroundColor: "#faf3ee"}}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel-content"
                          id="panel-header"
                          style={{height: "100%"}}
                      >
                      <Typography>
                              {selectedTempSize ? t(`common:selectOptions:${selectedTempSize}`): t('common:selectOptions:size')}
                      </Typography>
                      </AccordionSummary>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleSizeChangeMobile(30)}>{t('common:selectOptions:30')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleSizeChangeMobile(60)}>{t('common:selectOptions:60')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleSizeChangeMobile(100)}>{t('common:selectOptions:100')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleSizeChangeMobile(101)}>{t('common:selectOptions:101')}</Typography>
                      </AccordionDetails>
                  </Accordion>
              </FormControl>
            
              <FormControl style={{ marginTop: "30px", alignItems: "center"}}>
                  <Accordion style={{borderRadius: "20px", width: "90%", backgroundColor: "#faf3ee"}}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel-content"
                          id="panel-header"
                          style={{height: "100%"}}
                      >
                      <Typography>
                              {tempSelectedOrientation ? t(`common:selectOptions:${tempSelectedOrientation}`): t('common:selectOptions:format')}
                      </Typography>
                      </AccordionSummary>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleOrientationChangeMobile("Vertical")}>{t('common:selectOptions:Vertical')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handleOrientationChangeMobile("Horizontal")}>{t('common:selectOptions:Horizontal')}</Typography>
                      </AccordionDetails>
                  </Accordion>
              </FormControl>


              <FormControl style={{ marginTop: "30px", alignItems: "center"}}>
                  <Accordion style={{borderRadius: "20px", width: "90%", backgroundColor: "#faf3ee"}}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel-content"
                          id="panel-header"
                          style={{height: "100%"}}
                      >
                      <Typography>
                              {tempSelectedPrice ? t(`common:selectOptions:upTo${tempSelectedPrice}`): t('common:selectOptions:price')}
                      </Typography>
                      </AccordionSummary>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handlePriceChangeMobile(500)}>{t('common:selectOptions:upTo500')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handlePriceChangeMobile(1000)}>{t('common:selectOptions:upTo1000')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handlePriceChangeMobile(3000)}>{t('common:selectOptions:upTo3000')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handlePriceChangeMobile(5000)}>{t('common:selectOptions:upTo5000')}</Typography>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionDetails>
                          <Typography onClick={() => handlePriceChangeMobile(5001)}>{t('common:selectOptions:upTo5001')}</Typography>
                      </AccordionDetails>
                  </Accordion>
              </FormControl>
            </div>
          </List>
                   
          </div>
          <div style={{position: "fixed", width: "100%", bottom: "0", left: "0"}}>
          <div style={{ display: "flex", backgroundColor: "#faf3ee", justifyContent: "space-between", padding: '10px', borderTop: '1px solid #ddd' }}>
                  {isFilterActiveMobile() && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetFiltersMobile();
                      }}
                      variant="outlined"
                      color="secondary"
                      style={{ backgroundColor: "#fadf87", borderRadius: "20px", padding: "10px", border: "none", color: "black" }}
                    >
                      {t('common:selectOptions:clearFilter')}
                    </Button>
                  )}

                      {isFilterActiveMobile() && (
                         <Button 
                         onClick={() => {
                             setSelectedTrending(tempSelectedTrending);
                             setSelectedTags(selectedTempTags);
                             setSelectedSize(selectedTempSize);
                             setSelectedOrientation(tempSelectedOrientation)
                             setSelectedPrice(tempSelectedPrice)
                             handleClose();
                         }} 
                         style={{ backgroundColor: "#02a16c", borderRadius: "20px", padding: "10px", color: "white" }}
                       >
                         {t("common:selectOptions:showResult")}
                       </Button>
                      )}
                </div>
          </div>
                
            </Dialog>
        </div>
      ) : (
        // Desktop filters hereeee







        
        <div>
            <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '-20px',
                marginBottom: '20px',
            
            
             
                width: "100%"
             
              }}> 
              <div style={{display: "flex", flexDirection: "row", width: "90%"}}>
              <FormControl fullWidth>
                <InputLabel style={{width: "100%", color: "black"}}>
                {t('common:selectOptions:trending')}
                </InputLabel>
                <Select
                  value={selectedTrending || ''}
                  onChange={(e) => handleTrendingChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
              
                  sx={{'.MuiOutlinedInput-notchedOutline': {
                    borderStyle: "none",
                    color: "black"
                    
                  }}}
                >
                  <MenuItem value={7}>{t('common:selectOptions:trending7')}</MenuItem>
                    <MenuItem value={14}>{t('common:selectOptions:trending14')}</MenuItem>
                    <MenuItem value={30}>{t('common:selectOptions:trending30')}</MenuItem>
                    <MenuItem value={90}>{t('common:selectOptions:trending90')}</MenuItem>
                    <MenuItem value={365}>{t('common:selectOptions:trendingYear')}</MenuItem>
                    <MenuItem value={2000}>{t('common:selectOptions:trendingAll')}</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel style={{  width: "100%",  color: "black"}}>
                  {t('common:selectOptions:technique')}
                </InputLabel>
                <Select
                  value={selectedTechnique || ''}
                  onChange={(e) => handleTagChange(e.target.value as string)}
                  onClick={(e) => e.stopPropagation()}
                
                  sx={{'.MuiOutlinedInput-notchedOutline': {
                    borderStyle: "none",
                    
                  }}}
                >
                  {Object.keys(TAGS).map((key) => (
                    <MenuItem value={key} key={key}>
                      {t(`common:techniques:${key}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </div>
                  
                  <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                  <FormControl fullWidth>
                <InputLabel style={{ marginBottom: "8px", width: "100%",  color: "black" }}>
                  {t('common:selectOptions:format')}
                </InputLabel>
                <Select
                  value={selectedOrientation || ''}
                  onChange={(e) => handleOrientationChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                 
                  sx={{'.MuiOutlinedInput-notchedOutline': {
                    borderStyle: "none",
                    
                  }}}
                >
                  
                    <MenuItem value={'Vertical'}> {t('common:selectOptions:vertical')}</MenuItem>
                    <MenuItem value={'Horizontal'}> {t('common:selectOptions:horizontal')}</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel style={{ marginBottom: "8px",  color: "black" }}>
                  {t('common:selectOptions:size')}
                </InputLabel>
                <Select
                  value={selectedSize || ''}
                  onChange={(e) => handleSizeChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  sx={{'.MuiOutlinedInput-notchedOutline': {
                    borderStyle: "none",
                    
                  }}}
                >
                  <MenuItem value={'30'}>{t('common:selectOptions:small')}</MenuItem>
                  <MenuItem value={'60'}> {t('common:selectOptions:medium')}</MenuItem>
                  <MenuItem value={'100'}>{t('common:selectOptions:large')}</MenuItem>
                  <MenuItem value={'101'}> {t('common:selectOptions:extraLarge')}</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel style={{ marginBottom: "8px",  color: "black" }}>
                  {t('common:selectOptions:price')}
                </InputLabel>
                <Select
                  value={selectedPrice || ''}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  sx={{'.MuiOutlinedInput-notchedOutline': {
                    borderStyle: "none",
                    
                  }}}
                >
                    <MenuItem value={'500'}> {t('common:selectOptions:upTo500')}</MenuItem>
                    <MenuItem value={'1000'}>  {t('common:selectOptions:upTo1000')}</MenuItem>
                    <MenuItem value={'3000'}>             {t('common:selectOptions:upTo3000')}</MenuItem>
                    <MenuItem value={'5000'}>  {t('common:selectOptions:upTo5000')}</MenuItem>
                    <MenuItem value={'5001'}>  {t('common:selectOptions:over5000')}</MenuItem>
                </Select>
              </FormControl>
                  </div>
         
              
              {isFilterActive() && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetFilters()
                    }}
                    variant="outlined"
                    color="secondary"
                    style={{
                      margin: '6px',
                      borderRadius: '20px',
                      height: '40px',
                      textAlign: 'center',
                      border: '1px solid #c67777',
                      color: 'black',
                      fontSize: '10px'
                    }}
                  >
                    {t('common:selectOptions:clearFilter')}
                  </Button>
                )}
            </div>


                

                
              </div>
            <div className={s.selectedTagWrapper}>
              {selectedTags.map((tag, index) => (
                <div key={index}>
                  <div
                    className={s.selectedTagsDesktop}
                    style={{
                      textAlign: 'center'
                    }}
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
          </div>
      )}

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
