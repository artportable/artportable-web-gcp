import React, { useState } from "react";
import { Box, Checkbox, TextField } from "@material-ui/core";
import { styles } from "./discoverArt.css";
import ArtworkListItemDefined from "../ArtworkListItemDefined/ArtworkListItemDefined";
import { useStore } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { capitalizeFirst } from "../../utils/util";
import { useTranslation } from "next-i18next";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default function DiscoverArt({ artworkRows, tags, onFilter }) {
  const s = styles();
  const { t } = useTranslation(['discover', 'tags']);
  const store = useStore();

  const username = store.getState()?.user?.username;

  const [selectedTags, setSelectedTags] = useState([]);

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

  if(artworkRows === undefined) { return <></>}
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
      {artworkRows?.map((row, i) =>
        <div className={s.row} key={i}>
          {row.map(artwork => 
            <ArtworkListItemDefined 
              key={artwork.artwork.Id}
              width={artwork.width}
              height={artwork.height}
              artwork={artwork.artwork} 
              onLikeClick={onLikeClick} />
          )}
        </div>
      )}
    </Box>
  );
}
