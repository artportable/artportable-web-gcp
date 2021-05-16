import React, { useEffect, useState } from "react";
import { Box, Checkbox, TextField, Theme, useTheme } from "@material-ui/core";
import { styles } from "./discoverArt.css";
import ArtworkListItemDefined from "../ArtworkListItemDefined/ArtworkListItemDefined";
import { useStore } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { capitalizeFirst } from "../../utils/util";
import { useTranslation } from "next-i18next";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Artwork } from "../../models/Artwork";
import { getImageAsRows } from "../../utils/layoutUtils";

interface InputProps {
  artworks: Artwork[],
  tags: string[],
  onFilter: any,
  rowWidth: number,
  loadMoreElementRef: any
}

export default function DiscoverArt({ artworks, tags, onFilter, rowWidth, loadMoreElementRef }: InputProps) {
  const s = styles();
  const { t } = useTranslation(['discover', 'tags']);
  const store = useStore();

  const username = store.getState()?.user?.username;

  const [imageRows, setImageRows] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const theme: Theme = useTheme();
  
  useEffect(() => {
    const primaryImages = artworks.map(a => a.PrimaryFile);
    const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
    setImageRows(rows);
  }, [artworks]);

  function onLikeClick(artworkId, isLike) {
    fetch(`http://localhost:5001/api/artworks/${artworkId}/like?myUsername=${username}`, {
      method: isLike ? 'POST' : 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        console.log(response.statusText);
        throw response;
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <Box className={s.rowsContainer}>
      <Autocomplete
        multiple
        id="combo-box-demo"
        options={tags}
        getOptionLabel={(tag: string) => capitalizeFirst(t(`tags:${tag}`))}
        disableCloseOnSelect
        renderOption={(tag, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon/>}
              checkedIcon={<CheckBoxIcon/>}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {capitalizeFirst(t(`tags:${tag}`))}
          </React.Fragment>
        )}
        style={{ color: "blue" }}
        renderInput={(params) => <TextField {...params} label={t('tags')} variant="outlined" />}
        onChange={(event, value) => {
          setSelectedTags(value);
        }}
        onClose={(event) => {
          onFilter(selectedTags);
        }}
      ></Autocomplete>

      {imageRows && imageRows.map((row: Image[], i) =>
        <div className={s.row} key={i}>
          {row.map(image => {
            let artwork = artworks.find(a => a.PrimaryFile.Name === image.Name);

            if (artwork) {
              return <ArtworkListItemDefined
                key={image.Name}
                width={image.Width}
                height={image.Height}
                artwork={artwork}
                onLikeClick={onLikeClick} />
            }
          }
          )}
        </div>
      )}
      <div ref={loadMoreElementRef}></div>
    </Box>
  );
}
