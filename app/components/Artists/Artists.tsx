import React, { useEffect, useState } from 'react';
import Link from "next/link";
import {Typography} from '@material-ui/core';
import Main from '../Main/Main';
import { styles } from "./artists.css";
import { userInfo } from 'node:os';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Å","Ä","Ö"];

export default function artists() {
  const s = styles();
  const [data, setData] = useState([]);
  const [artists, setArtists] = useState([]);
  const [letters, setLetters] = useState([]);

  const fetchData = async () => {
    const resposne = await fetch(`${apiBaseUrl}/api/Artists`);
    const newData = await resposne.json();
    
    newData.sort((a, b) => {
      if (a.Surname.toUpperCase() < b.Surname.toUpperCase()) return -1;
      if( a.Surname.toUpperCase() > b.Surname.toUpperCase()) return +1;
    });
    
    var currentChar = '';
    var sameLetterArtists = []
    var a = []
    var l = [] 
    newData.map((user, i) => {
      
      if(user.Surname.slice(0,1).toUpperCase() != currentChar){
        if(currentChar != ''){
          a.push({currentChar, sameLetterArtists});
          sameLetterArtists = []
        }
        currentChar = user.Surname.slice(0,1).toUpperCase();
        l.push(currentChar)
      }
      sameLetterArtists.push(user);
      if(i + 1 == newData.length)
        a.push({currentChar, sameLetterArtists})
    })
    setLetters(l);
    setArtists(a);
  }

  const handleClick = (id) => {
    if (id == 's') {
      id.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })}
    if (id == 't') {
      id = alphabet[19];
      id.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })}
    return id;
  }

  const listArtists = () => {
    return artists.map(a => {
      return (
        <div id={a.currentChar}>
            <Typography>
              {a.currentChar}
            </Typography>
            {a.sameLetterArtists.map(artist => {
              return(
                <Link href={`/profile/@${artist.username}`} passHref>
                  <a> 
                    <Typography>
                    {artist.Name + " " + artist.Surname}
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
      return(
        <a href={`#${l}`}>
          {l}
        </a>
      )
    })
  }

  // const sort_storeName_alpha = ( a, b ) => {
  //   if(a.Username < b.Username) return -1
  //   if(b.Username < a.Username) return 1
  //   return 0
  // }
  

  

 // group the stores by initial letter
    // produces a list of { initialLetter: 'A', stores: [ store1, store2, store3 ] }
  //   let prevInitialLetter = null
  //   let alphabeticList = data
  //   .sort(sort_storeName_alpha)
  //   .reduce(( groups, data ) => {
  //       let myInitialLetter = data.Username
  //       let belongsInNewGroup = myInitialLetter !== prevInitialLetter
        
  //       if(belongsInNewGroup) {
  //           // create a new group and add this store as its first member
  //           groups.push({ initialLetter: myInitialLetter, stores: [ data ] })
  //       } else {
  //           // add this store to the previous group
  //           groups[groups.length - 1].stores.push(data)
  //       }
        
  //       return groups
  //  }, [])

      

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      {
        listLetters()
      }

      {
        listArtists()
      }
     {/*data.map((user, index) => {
             const {Username, Surname, Name} = user;
     
             return ( 
              <article key={Username} id='t'>
      
                <Link href={`/profile/@${Username}`}>
                  <a>
                    <Typography>
                      <h2>{Username}</h2>
                    </Typography>
                  </a>
                </Link>
                <div>
                  <p>{Name} {Surname}</p>
                </div>
              </article>
             )})*/}
    </div>
  );
}


    {/* <h1>Artists</h1>
    // <nav>
    // <a href='#a' onClick={() => handleClick}>   a</a>
    // <a href='#b' onClick={() => handleClick}>   b</a>
    // <a href='#c' onClick={() => handleClick}>   c</a>
    // <a href='#d' onClick={() => handleClick}>   d</a>
    // <a href='#e' onClick={() => handleClick}>   e</a>
    // <a href='#f' onClick={() => handleClick}>   f</a>
    // <a href='#g' onClick={() => handleClick}>   g</a>
    // <a href='#h' onClick={() => handleClick}>   h</a>
    // <a href='#i' onClick={() => handleClick}>   i</a>
    // <a href='#j' onClick={() => handleClick}>   j</a>
    // <a href='#k' onClick={() => handleClick}>   k</a>
    // <a href='#l' onClick={() => handleClick}>   l</a>
    // <a href='#m' onClick={() => handleClick}>   m</a>
    // <a href='#n' onClick={() => handleClick}>   n</a>
    // <a href='#o' onClick={() => handleClick}>   o</a>
    // <a href='#p' onClick={() => handleClick}>   p</a>
    // <a href='#q' onClick={() => handleClick}>   q</a>
    // <a href='#r' onClick={() => handleClick}>   r</a>
    // <a href='#s' onClick={() => handleClick}>   s</a>
    // <a href='#t' onClick={() => handleClick}>   t</a>
    // <a href='#u' onClick={() => handleClick}>   u</a>
    // <a href='#v' onClick={() => handleClick}>   v</a>
    // <a href='#w' onClick={() => handleClick}>   w</a>
    // <a href='#x' onClick={() => handleClick}>   x</a>
    // <a href='#y' onClick={() => handleClick}>   y</a>
    // <a href='#z' onClick={() => handleClick}>   z</a>
    // <a href='#å' onClick={() => handleClick}>   å</a>
    // <a href='#ä' onClick={() => handleClick}>   ä</a>
    // <a href='#ö' onClick={() => handleClick}>   ö</a>
    // </nav>

    // <div className={s.alphabeticTable}>
    //   <div className={s.group1}>
    //     <div id='a' className={s.group1Div}>
    //       <h1>A</h1>
    //       {data.filter(x => x.Username.startsWith('a')).map((user) => {
    //         const {Username, Surname, Name} = user;
    //         return ( <article key={Username}>
    //             <Link href={`/profile/@${Username}`}>
    //           <a>
    //             <Typography>
    //             <h2>{Username}</h2>
    //             </Typography>
    //           </a>
    //         </Link>
    //         <div>
    //           <p>{Name} {Surname}</p>
    //         </div>
    //         </article>
    //         )
    //       })
    //       }
    //     </div>
    //     <div id='b' className={s.group1Div}>
    //       <h1>B</h1>
    //       {data.filter(x => x.Username.startsWith('b')).map((user) => {
    //         const {Username, Surname, Name} = user;
    //         return ( <article key={Username}>
    //             <Link href={`/profile/@${Username}`}>
    //           <a>
    //             <Typography>
    //               <h2>{Username}</h2>
    //             </Typography>
    //           </a>
    //         </Link>
    //         <div>
    //           <p>{Name} {Surname}</p>
    //         </div>
    //         </article>
    //         )
    //       })
    //       }
    //     </div>
    //     <div id='c' className={s.group1Div}>
    //       <h1>C</h1>
    //       {data.filter(x => x.Username.startsWith('c')).map((user) => {
    //         const {Username, Surname, Name} = user;
    //         return ( <article key={Username}>
    //           <div className={s.artileDiv}>
    //             <Link href={`/profile/@${Username}`}>
    //           <a>
    //             <Typography>
    //               <div className={s.p}>
    //                 <div>
    //                   <p>{Name} {Surname}</p>
    //                 </div>
    //               </div>
    //             </Typography>
    //           </a>
    //         </Link>
       
        
    //         </div>
    //         </article>
    //         )
    //       })
    //       }
    //     </div>
      
    //     <div id='d' className={s.group1Div}>
    //       <h1>D</h1>
    //       {data.filter(x => x.Username.startsWith('d')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //         <div className={s.artileDiv}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //             <p className={s.artileDiv}>{Name} {Surname}</p>
    //           </Typography>
    //         </a>
    //       </Link>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
      
    // </div>
    //   <div id='e'>
    //     <h1>E</h1>
    //     {data.filter(x => x.Username.startsWith('e')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='f'>
    //     {data.filter(x => x.Username.startsWith('f')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='g'>
    //     {data.filter(x => x.Username.startsWith('g')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='h'>
    //     {data.filter(x => x.Username.startsWith('h')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='i'>
    //     {data.filter(x => x.Username.startsWith('i')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='j'>
    //     {data.filter(x => x.Username.startsWith('j')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='k'>
    //     {data.filter(x => x.Username.startsWith('k')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='l'>
    //     {data.filter(x => x.Username.startsWith('l')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='m'>
    //     {data.filter(x => x.Username.startsWith('m')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='n'>
    //     {data.filter(x => x.Username.startsWith('n')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='o'>
    //     {data.filter(x => x.Username.startsWith('o')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='p'>
    //     {data.filter(x => x.Username.startsWith('p')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='q'>
    //     {data.filter(x => x.Username.startsWith('q')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='r'>
    //     {data.filter(x => x.Username.startsWith('r')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='s'>
    //     {data.filter(x => x.Username.startsWith('s')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='t'>
    //     {data.filter(x => x.Username.startsWith('t')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='u'>
    //     {data.filter(x => x.Username.startsWith('u')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='v'>
    //     {data.filter(x => x.Username.startsWith('v')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='w'>
    //     {data.filter(x => x.Username.startsWith('w')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='x'>
    //     {data.filter(x => x.Username.startsWith('x')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='y'>
    //     {data.filter(x => x.Username.startsWith('y')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='z'>
    //     {data.filter(x => x.Username.startsWith('z')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='å'>
    //     {data.filter(x => x.Username.startsWith('å')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='ä'>
    //     {data.filter(x => x.Username.startsWith('ä')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })
    //     }
    //   </div>
    //   <div id='ö'>
    //     {data.filter(x => x.Username.startsWith('ö')).map((user) => {
    //       const {Username, Surname, Name} = user;
    //       return ( <article key={Username}>
    //           <Link href={`/profile/@${Username}`}>
    //         <a>
    //           <Typography>
    //           <h2>{Username}</h2>
    //           </Typography>
    //         </a>
    //       </Link>
    //       <div>
    //         <p>{Name} {Surname}</p>
    //       </div>
    //       </article>
    //       )
    //     })}
    //   </div>

    //   </div>
    // </div> */}

