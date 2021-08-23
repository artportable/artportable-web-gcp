import React, { useEffect, useState } from "react";
import { Box, Checkbox, Chip, TextField, Theme, useTheme } from "@material-ui/core";
import { styles } from "./discoverArt.css";
import ArtworkListItemDefined from "../ArtworkListItemDefined/ArtworkListItemDefined";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { capitalizeFirst } from "../../utils/util";
import { useTranslation } from "next-i18next";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Artwork } from "../../models/Artwork";
import { getImageAsRows } from "../../utils/layoutUtils";
import Image from "../../models/Image";
import DiscoverArtSkeleton from "../DiscoverArtSkeletonCard/DiscoverArtSkeleton";
import { useBreakpointDown } from "../../hooks/useBreakpointDown";
import clsx from 'clsx'

interface InputProps {
  artworks: Artwork[],
  tags: string[],
  onFilter: any,
  onLike: any,
  rowWidth: number,
  loadMoreElementRef: any
  isLoading: boolean;
  loadMore: boolean;
}



export default function DiscoverArt({ artworks, tags, onFilter, onLike, rowWidth, loadMoreElementRef, isLoading, loadMore }: InputProps) {
  const s = styles();
  const { t } = useTranslation(['discover', 'tags']);
  const smScreenOrSmaller = useBreakpointDown('sm');

  const initCategoryTags = [
    { name: t('tags:oil'), selected: false, id: "oil" },
    { name: t('tags:acrylic'), selected: false, id: "acrylic" },
    { name: t('tags:aquarelle'), selected: false, id: "aquarelle" },
    { name: t('tags:photography'), selected: false, id: "photography" },
    { name: t('tags:sculpture'), selected: false, id: "sculpture" },
    { name: t('tags:pastel'), selected: false, id: "pastel" },
    { name: t('tags:ceramic'), selected: false, id: "ceramic" },
    { name: t('tags:mixed-media'), selected: false, id: "mixed-media" },
    { name: t('tags:digital'), selected: false, id: "digital" }
  ];

  //TODO: Move this to backend and distinguish the category tags above with a flag or similar
  const filteredTags = tags.filter(t => !initCategoryTags.some(categoryTag => categoryTag.id === t));

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;

  const [imageRows, setImageRows] = useState([]);
  const [skeletonRows, setSkeletonRows] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);
  const [categoryTags, setCategoryTags] = useState(initCategoryTags);

  const theme: Theme = useTheme();
  const skeletonImages = [
    {
      Name: "Skeleton1",
      Width: 16,
      Height: 9
    },
    {
      Name: "Skeleton2",
      Width: 4,
      Height: 3
    },
    {
      Name: "Skeleton3",
      Width: 9,
      Height: 16
    },
    {
      Name: "Skeleton4",
      Width: 4,
      Height: 3
    },
    {
      Name: "Skeleton5",
      Width: 16,
      Height: 9
    },
  ]

  useEffect(() => {
    const primaryImages = artworks.map(a => a.PrimaryFile);
    const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
    setImageRows(rows);
    const skeletonRows = getImageAsRows(skeletonImages, theme.spacing(2), rowWidth);
    setSkeletonRows(skeletonRows);
  }, [artworks]);

  useEffect(() => {
    onFilter([]);
  }, []);

  const setCategoryTagSelected = (index) => {
    const current = categoryTags;
    current[index].selected = !current[index].selected;

    setCategoryTags([...current]);
    filterOnTags();
  }

  const filterOnTags = () => {
    const selectedCategoryTags = categoryTags
      .filter(t => t.selected)
      .map(t => t.id);
    
    onFilter([...selectedTags, ...selectedCategoryTags]);
  }

  return (
    <>
      <Box className={s.rowsContainer}>
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={filteredTags}
          getOptionLabel={(tag: string) => capitalizeFirst(t(`tags:${tag}`))}
          disableCloseOnSelect
          renderOption={(tag, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {capitalizeFirst(t(`tags:${tag}`))}
            </React.Fragment>
          )}
          style={{ minHeight: "56px" }}
          renderInput={(params) => <TextField {...params} label={t('tags')} variant="outlined" />}
          onChange={(_, value, reason) => {
            setSelectedTags(value);
            if (reason === 'remove-option') {
              filterOnTags();
            }
          }}
          onClose={(_) => {
            filterOnTags();
          }}
        ></Autocomplete>
        <ul className={s.categoryTags}>
          {categoryTags.map((tag, i) => 
              <li className={clsx(tag.selected && s.selected)} key={tag.name}>
                <Chip
                  onClick={(_) => setCategoryTagSelected(i)}
                  variant={tag.selected ? "default" : "outlined"}
                  color="primary"
                  label={tag.name}
                  className={s.categoryTag} />
              </li>
          )}
        </ul>
        {imageRows && imageRows.map((row: Image[], i) =>
          <div className={s.row} key={i}>
            {row.map(image => {
              let artwork = artworks.find(a => a.PrimaryFile.Name === image.Name);
              
              if (artwork) {
                return <ArtworkListItemDefined
                key={image.Name}
                width={smScreenOrSmaller ? '100%' : image.Width}
                height={smScreenOrSmaller ? 'auto' : image.Height}
                artwork={artwork}
                onLikeClick={onLike} />
              }
            }
            )}
          </div>
        )}
        {!isLoading && loadMore && 
          <div className={s.row} ref={loadMoreElementRef}>
          {skeletonRows && skeletonRows.length > 0 &&
            <div className={s.row}>
              {skeletonRows[0].map(image => {
                return <DiscoverArtSkeleton
                  key={image.Name}
                  width={image.Width}
                  height={image.Height} />
  
              }
              )}
            </div>
          }
          </div>
        }
      </Box>
    </>
  );
}
