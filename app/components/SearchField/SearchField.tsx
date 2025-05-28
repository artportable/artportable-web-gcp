import { useState, useRef, useEffect, useContext } from "react";
import {
  Paper,
  TextField,
  InputAdornment,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { styles } from "./searchField.css";
import clsx from "clsx";
import Button from "../Button/Button";
import { useTranslation } from "next-i18next";
import { UserContext } from "../../contexts/user-context";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SearchField = ({ onFilter, searchQuery, iconOnly = false }) => {
  const { t } = useTranslation(["header", "common"]);
  const s = styles();
  const [inputValue, setInputValue] = useState(searchQuery || "");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const { isSignedIn } =
    useContext(UserContext);
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

  const rotatingItems = [
    t("common:techniques.oil"),
    t("common:themes.abstract"),
    t("common:techniques.print"),
    t("common:themes.portraiture"),
    t("common:techniques.aquarelle"),
    t("common:themes.landscape"),
    t("common:techniques.photography"),
    t("common:themes.nature"),
    "London",
    t("common:medium.ceramic"),
    t("common:themes.minimalism")
  ];

  const trendingItems = [
    t("common:techniques.oil"),
    t("common:techniques.acrylic"),
    t("common:techniques.aquarelle"),
    t("common:techniques.photography"),
    t("common:techniques.sculpture")
  ];

  const techniqueItems = [
    t("common:techniques.mixed-media"),
    t("common:techniques.digital"),
    t("common:techniques.illustration"),
    t("common:techniques.drawing"),
    t("common:techniques.pastel")
  ];

  const mediumItems = [
    t("common:medium.painting"),
    t("common:medium.digital-art"),
    t("common:medium.illustrations"),
    t("common:medium.ceramic"),
    t("common:medium.sculpture")
  ];

  const trendingArtItems = [
 
    { title: t("common:techniques.acrylic"), category: "acrylic" },
    { title: t("common:techniques.aquarelle"), category: "aquarelle" },
    { title: t("common:themes.portraiture"), category: "portraiture" },
    { title: t("common:themes.architecture"), category: "architecture" },
    { title: t("common:themes.minimalism"), category: "minimalism" },
    { title: t("common:themes.street-art"), category: "street-art" }
  ];

  // Add effect for rotating placeholder
  useEffect(() => {
    // Shuffle the array on component mount
    const shuffledItems = [...rotatingItems].sort(() => Math.random() - 0.5);
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => 
        (prevIndex + 1) % shuffledItems.length
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Preload category images for faster loading
  useEffect(() => {
    indexCategories.forEach((category) => {
      const img = new Image();
      img.src = category.backgroundImage;
    });
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setInputValue(event.target.value);

    if (value === "") {
      setFilteredArtists([]);
    } else {
      const searchWords = value.split(" ");
      const filtered = artists
        .filter((artist) => {
          const fullName = `${artist.Name} ${
            artist.Surname || ""
          }`.toLowerCase();
          return searchWords.every((word) => fullName.includes(word));
        })
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

  const handleClickAway = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleTrendingClick = (item) => {
    setInputValue(item);
    onFilter(item);
    setOpen(true);
  };

  const handleTrendingItemClick = (category) => {
    window.location.href = `/discover?category=${category}`;
  };

  const indexCategories = [
    { 
      title: t("common:themes.abstract"), 
      href: "/discover?category=abstract",
      backgroundImage: "/searchimages/abstract.jpeg"
    },
    { 
      title: t("common:themes.landscape"), 
      href: "/discover?category=landscape",
      backgroundImage: "/searchimages/hq-optimized/landscape-hq.jpeg"
    },
    { 
      title: t("common:themes.animal"), 
      href: "/discover?category=animal",
      backgroundImage: "/searchimages/hq-optimized/animal-hq.jpeg"
    },
    { 
      title: t("common:themes.figurative"), 
      href: "/discover?category=figurative",
      backgroundImage: "/searchimages/hq-optimized/figurative-hq.jpeg"
    },
    { 
      title: t("common:techniques.photography"), 
      href: "/discover?category=photography",
      backgroundImage: "/searchimages/hq-optimized/photography-hq.jpeg"
    },
    { 
      title: t("common:themes.surrealism"), 
      href: "/discover?category=surrealism",
      backgroundImage: "/searchimages/surrealism.jpeg"
    }
  ];

  const renderSearchPopup = () => {
    if (!open) return null;
    
    return (
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
          className={s.paper}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
              }}
            >
              <TextField
                style={{ width: "100%", fontSize: "17px" }}
                autoFocus={false}
                fullWidth
                placeholder={t("common:words.searchPlaceholder")}
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

            <div className={s.searchPopup} >
              {/* Left side - Artists */}
              <div style={{ flex: "0 0 40%", borderRight: "1px solid #eee", paddingRight: "20px" }}>
                {inputValue.trim() !== "" && filteredArtists.length > 0 ? (
                  <>
                    <div style={{ fontSize: "16px", fontWeight: 600 }}>
                      {t("artist")}
                    </div>
                    <List>
                      {filteredArtists.map((artist) => (
                        <a
                          key={artist.Username}
                          href={`/profile/@${artist.Username}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            fontSize: "14px",
                            display: "block",
                           
                          }}
                        >
                          <ListItem
                            button
                            component="a"
                            style={{ padding: "8px 0" }}
                          >
                            <ListItemText
                              primary={`${artist.Name} ${artist.Surname || ""}`}
                            />
                          </ListItem>
                        </a>
                      ))}
                    </List>
                  </>
                ) : inputValue.trim() !== "" ? (
                  <div style={{ color: "#666", fontSize: "14px" }}>
                    {t("common:selectOptions:searchForArtist")}
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "15px" }}>
                      {t("common:trendingArtFeed")}
                    </div>
                    <div>
                      {trendingArtItems.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleTrendingItemClick(item.category)}
                          className={s.trendingItem}
                        >
                          <TrendingUpIcon style={{ fontSize: "16px", color: "rgb(34, 144, 89)" }} />
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right side - Categories */}
              <div className={s.categories} >
                <div style={{ fontSize: "14px", marginBottom: "10px", fontWeight: 400 }}>
                  {t("common:selectOptions:quickSearch")}
                </div>
                <div className={s.categoriesGrid} >
                  {indexCategories.map((category) => (
                    <a
                      key={category.href}
                      href={category.href}
                      className={s.categoryItem}
                      style={{
                        backgroundImage: `url(${category.backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      onMouseEnter={(e) => {
                        const overlay = e.currentTarget.querySelector('.category-overlay') as HTMLDivElement;
                        if (overlay) {
                          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        const overlay = e.currentTarget.querySelector('.category-overlay') as HTMLDivElement;
                        if (overlay) {
                          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                        }
                      }}
                    >
                      <div
                        className="category-overlay"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                          transition: "background-color 0.3s ease",
                        }}
                      />
                      <div
                        className={s.categoryTitle}
                      >
                        {category.title}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Paper>
        </ClickAwayListener>
      </div>
    );
  };

  if (iconOnly) {
    return (
      <>
        <IconButton 
          className={s.searchIconButton} 
          onClick={() => setOpen(true)}
        >
          <SearchIcon />
        </IconButton>
        {renderSearchPopup()}
      </>
    );
  }

  return (
    <>
      {/* Search Input */}
      <div
        className={clsx(s.inputContainer)}
        ref={inputRef}
        onClick={() => setOpen(true)}
        style={{
          width: !isSignedIn.value ? "600px" : "300px",
        }}
      >
        <input
          className={s.input}
          value={inputValue}
          placeholder={`${t("common:words.searchFor")} ${rotatingItems[currentPlaceholderIndex]}`}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus={false}
        />
      </div>
      {renderSearchPopup()}
    </>
  );
};

export default SearchField;