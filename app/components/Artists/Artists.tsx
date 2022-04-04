import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Typography } from '@material-ui/core';
import { styles } from "./artists.css";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function artists() {
  const s = styles();
  const [artists, setArtists] = useState([]);
  const [letters, setLetters] = useState([]);

  const fetchData = async () => {
    const resposne = await fetch(`${apiBaseUrl}/api/Artists`);
    const newData = await resposne.json();

    newData.sort((a, b) => {
      if (a.Name.toUpperCase() < b.Name.toUpperCase()) return -1;
      if (a.Name.toUpperCase() > b.Name.toUpperCase()) return +1;
    });

    var currentChar = '';
    var sameLetterArtists = []
    var a = []
    var l = []
    newData.map((user, i) => {
      if (user.Name.slice(0, 1).toUpperCase() != currentChar) {
        if (currentChar != '') {
          a.push({ currentChar, sameLetterArtists });
          sameLetterArtists = []
        }
        currentChar = user.Name.slice(0, 1).toUpperCase();
        l.push(currentChar)
      }
      sameLetterArtists.push(user);
      if (i + 1 == newData.length)
        a.push({ currentChar, sameLetterArtists })
    })
    setLetters(l);
    setArtists(a);
  }

  const listArtists = () => {
    return artists.map(a => {
      return (
        <div id={a.currentChar}>
          <Typography className={s.letter}>
            {a.currentChar}
          </Typography>
          {a.sameLetterArtists.map(artist => {
            return (
              <Link href={`/profile/@${artist.Username}`} passHref>
                <a>
                  <Typography className={s.artistName}>
                    {artist.Name}
                    {artist.Surname && artist.Surname}
                  </Typography>
                </a>
              </Link>
            )
          })}
        </div>
      )
    })
  }

  const listLetters = () => {
    return letters.map(l => {
      return (
        <a href={`#${l}`} className={s.letterList}>
          {l}
        </a>
      )
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className={s.pagecontainer}>
      <div className={s.container}>
        <div className={s.groupDiv}>
          <div>
            {listArtists()}
          </div>
        </div>
      </div>
      <div className={s.alphabetcontainer}>
        {listLetters()}
      </div>
    </div>
  );
}