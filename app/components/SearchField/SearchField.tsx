import { useState, useRef, useEffect } from "react";
import {
  Paper,
  TextField,
  InputAdornment,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import { styles } from "./searchField.css";
import clsx from "clsx";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SearchField = ({ onFilter, searchQuery }) => {
  const { t } = useTranslation(["header", "common"]);
  const s = styles();
  const [inputValue, setInputValue] = useState(searchQuery || "");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);

  // Fetch artists on mount
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/Artists`);
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredArtists([]);
    } else {
      const filtered = artists
        .filter((artist) =>
          `${artist.Name} ${artist.Surname || ""}`
            .toLowerCase()
            .includes(value.toLowerCase())
        )
        .slice(0, 5);
      setFilteredArtists(filtered);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (filteredArtists.length === 1) {
        setInputValue(
          `${filteredArtists[0].Name} ${filteredArtists[0].Surname || ""}`
        );
        onFilter(filteredArtists[0].Name);
      } else {
        onFilter(inputValue);
      }
      setOpen(false);
    }
  };

  const handleArtistClick = (artist) => {
    setInputValue(`${artist.Name} ${artist.Surname || ""}`);
    onFilter(artist.Name);
    setOpen(false);
  };

  const handleClickAway = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const trendingItems = [
    `${t("common:techniques:oil")}`,
    `${t("common:techniques:acrylic")}`,
    `${t("common:techniques:aquarelle")}`,
    `${t("common:techniques:pastel")}`,
  ];

  const handleTrendingClick = (item) => {
    setInputValue(item);
    onFilter(item);
    setOpen(true);
  };

  return (
    <>
      {/* Search Input */}
      <div
        className={clsx(s.inputContainer)}
        ref={inputRef}
        onClick={() => setOpen(true)}
      >
        <input
          className={s.input}
          value={inputValue}
          placeholder="Sök"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Full-Width Popper at the Top */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            backgroundColor: "white",
            zIndex: 9999,

            borderBottom: "1px solid #ddd",
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper
              style={{
                padding: "10px",
                height: "250px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                zIndex: 10330,
              }}
            >
              {/* Search Bar Inside Popper */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                }}
              >
                <TextField
                  style={{ width: "85%" }}
                  autoFocus
                  fullWidth
                  placeholder="Search..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button className={s.button} onClick={() => setOpen(false)}>
                  {t("common:selectOptions:close")}{" "}
                  <CloseIcon style={{ fontSize: "15px" }} />
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  padding: "10px 20px 10px 25px",
                }}
              >
                <div style={{ margin: "10px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      marginBottom: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {t("common:selectOptions:trending")}
                  </div>

                  {trendingItems.map((item) => (
                    <div
                      key={item}
                      style={{
                        marginBottom: "6px",
                        cursor: "pointer",
                        color: "black",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleTrendingClick(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "right",
                    marginLeft: "auto",
                  }}
                >
                  {inputValue.trim() !== "" && filteredArtists.length > 0 && (
                    <List>
                      <ListItem>
                        <div style={{ fontWeight: 600 }}>{t("artist")}</div>
                      </ListItem>

                      {filteredArtists.map((artist) => (
                        <a
                          key={artist.Username}
                          href={`/profile/@${artist.Username}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            fontSize: "12px",
                          }}
                        >
                          <ListItem
                            button
                            component="a"
                            style={{ marginLeft: "15px", padding: "0px" }}
                          >
                            <ListItemText
                              primary={`${artist.Name} ${artist.Surname || ""}`}
                            />
                          </ListItem>
                        </a>
                      ))}
                    </List>
                  )}
                </div>
              </div>
            </Paper>
          </ClickAwayListener>
        </div>
      )}
    </>
  );
};

export default SearchField;
