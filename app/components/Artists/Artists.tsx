import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import InputAdornment from "@material-ui/core/InputAdornment";
import { styles } from "./artists.css";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function artists() {
  const s = styles();
  const { t } = useTranslation(["common"]);
  const [artists, setArtists] = useState([]);
  const [letters, setLetters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRefs = useRef([]);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("smPlus"));

  const fetchData = async () => {
    const resposne = await fetch(`${apiBaseUrl}/api/Artists`);
    const newData = await resposne.json();

    newData.sort((a, b) => {
      if (a.Name.toUpperCase() < b.Name.toUpperCase()) return -1;
      if (a.Name.toUpperCase() > b.Name.toUpperCase()) return +1;
    });

    var currentChar = "";
    var sameLetterArtists = [];
    var a = [];
    var l = [];
    newData.map((user, i) => {
      if (user.Name.slice(0, 1).toUpperCase() != currentChar) {
        if (currentChar != "") {
          a.push({ currentChar, sameLetterArtists });
          sameLetterArtists = [];
        }
        currentChar = user.Name.slice(0, 1).toUpperCase();
        l.push(currentChar);
      }
      sameLetterArtists.push(user);
      if (i + 1 == newData.length) a.push({ currentChar, sameLetterArtists });
    });
    setLetters(l);
    setArtists(a);
  };

  const scrollToSection = (letter) => {
    const elem = scrollRefs.current[letter];
    
    if (elem) {
      const elementPosition = elem.getBoundingClientRect().top;
      const navbarHeight = desktop ? 165 : 95; // alphabetcontainer on the side on mobile.
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Not finished. Replacing Artists.tsx with ArtistIndex.tsx in artists.tsx. Same component on /artists as on start page.
  // If searching for more than one letter, scroll down to letter.
  const scrollToName = (name) => {
    if (searchQuery.length === 1) {
      
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // onChange only triggers when text changes, so need onKeyDown function for detecting enter key press.
  const searchKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (searchQuery.length === 1) {
        scrollToSection(searchQuery.toUpperCase());
      } else if (searchQuery.length > 1) {
        scrollToName(searchQuery);
      }
    }
  };

  const listArtists = () => {
    return artists.map((a) => {
      return (
        <div id={a.currentChar}>
          {/* ref for scrolling. Not containing entire list, or scroll is wrong when list continues on next row. */}
          <div ref={((el) => (scrollRefs.current[a.currentChar] = el))}></div>
          <Typography className={s.letter}>{a.currentChar}</Typography>
          {a.sameLetterArtists.map((artist) => {
            return (
              <Link href={`/profile/@${artist.Username}`} passHref>
                <a>
                  <Typography className={s.artistName}>
                    {artist.Name} {artist.Surname && artist.Surname}
                  </Typography>
                </a>
              </Link>
            );
          })}
        </div>
      );
    });
  };

  const listLetters = () => {
    return letters.map((l) => {
      return (
        <div className={s.letterList} onClick={() => scrollToSection(l)}>
          {l}
        </div>
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={s.pagecontainer}>
      <div className={s.container}>
        <div className={s.groupDiv}>
          <div>{listArtists()}</div>
        </div>
      </div>
      <div className={s.alphabetcontainer}>{listLetters()}</div>
      <div className={s.searchBar} style={{ zIndex: 10 }}>
        <Input
          placeholder={t("searchForArtist")}
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={searchKeyDown}
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <SearchSharpIcon />
            </InputAdornment>
          }
        />
      </div>
    </div>
  );
}
