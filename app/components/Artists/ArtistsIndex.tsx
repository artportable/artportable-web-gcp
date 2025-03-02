import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { Typography, Input } from "@material-ui/core";
import { styles } from "./artistsIndex.css";
import { useTranslation } from "next-i18next";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import InputAdornment from "@material-ui/core/InputAdornment";
import { NavigationContext } from "../../contexts/navigation-context";

interface Props {
  showAllFromStart: boolean;
}

export default function artistsIndex(props: Props) {
  // For SEO reasons, on /artists page we want to show all artists as default:
  const { showAllFromStart } = props;
  const s = styles();
  const { t } = useTranslation(["common"]);
  const [artists, setArtists] = useState([]);
  const [letters, setLetters] = useState([]);

  const { searchQuery, setSearchQuery, selectedLetter, setSelectedLetter } =
    useContext(NavigationContext);

  const handleLetterClick = (letter, event) => {
    event.preventDefault();
    setSelectedLetter(letter);
    setSearchQuery("");
  };

  const highlightText = (text, search) => {
    const searchWords = search.split(" ").filter((word) => word.trim() !== "");

    let fragments = [{ text, highlight: false }];

    for (const word of searchWords) {
      let newFragments = [];

      for (const fragment of fragments) {
        if (!fragment.highlight) {
          const parts = fragment.text.split(
            new RegExp(`(${word.trim()})`, "i")
          );

          for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
              newFragments.push({ text: parts[i], highlight: false });
            } else {
              newFragments.push({ text: parts[i], highlight: true });
            }
          }
        } else {
          newFragments.push(fragment);
        }
      }

      fragments = newFragments;
    }

    return (
      <span>
        {fragments.map((fragment, i) =>
          fragment.highlight ? (
            <span
              key={i}
              style={{
                color: "#c67777",
              }}
            >
              {fragment.text}
            </span>
          ) : (
            fragment.text
          )
        )}
      </span>
    );
  };

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
  const listArtists = () => {
    const artistList = filteredArtists();
    return artistList.map((a) => {
      return (
        <div key={a.currentChar} id={a.currentChar}>
          <Typography className={s.letter}>{a.currentChar}</Typography>
          {a.sameLetterArtists.map((artist) => {
            return (
              <Link
                key={artist.Username}
                href={`/profile/@${artist.Username}`}
                passHref
              >
                <a>
                  <Typography className={s.artistName}>
                    {highlightText(artist.Name, searchQuery)}
                    {artist.Surname && (
                      <> {highlightText(artist.Surname, searchQuery)}</>
                    )}
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
        <a
          href={`#${l}`}
          className={s.letterList}
          onClick={(e) => handleLetterClick(l, e)}
          key={l}
        >
          {l}
        </a>
      );
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedLetter(null);
  };
  const filteredArtists: () => any[] = () => {
    let filtered = artists;

    if (searchQuery) {
      filtered = filtered
        .map((section) => ({
          ...section,
          sameLetterArtists: section.sameLetterArtists.filter((artist) =>
            `${artist.Name} ${artist.Surname || ""}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.sameLetterArtists.length > 0);
    }

    if (selectedLetter) {
      filtered = filtered.filter(
        (section) => section.currentChar === selectedLetter
      );
    }

    return filtered;
  };
  return (
    <div className={s.pagecontainer}>
      <div className={s.container}>
        <div className={s.searchBar}>
          <Input
            placeholder={t("searchForArtist")}
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <SearchSharpIcon />
              </InputAdornment>
            }
          />
        </div>
        <div className={s.alphabetcontainer}>{listLetters()}</div>
        <div className={s.groupDiv}>
          {((searchQuery && searchQuery.length > 0) ||
            selectedLetter ||
            showAllFromStart) && <div>{listArtists()}</div>}
        </div>
      </div>
    </div>
  );
}
