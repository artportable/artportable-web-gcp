import React, { useEffect, useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { styles } from './artworkmasonry.css';

export default function ArtworkMasonry({ layout, items, isMyProfile }) {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const publicUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const s = styles();
  // const masonryRef = useRef(null);
  // const [msnry, setMsnry] = useState(null);

  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    setSortedItems(items.map((item, index) => {
      return {
        index,
        item,
      }
    }));
  }, [items]);

  // useEffect(() => {
  //   console.log('INIT MASONRY');
  //   console.log('masonryRef', masonryRef);
  //   const masonry = new Masonry(masonryRef, {
  //     itemSelector: '.grid-item',
  //     columnWidth: 200
  //   });
  //   setMsnry(masonry);
  // }, [masonryRef])
  // console.log('msnry', msnry);
  // return (
  //   <div className={s.container} ref={masonryRef}>
  //     <h1>Masonry</h1>
  //   </div>
  // )

  if (layout === 0) {
    return (
      <div className={s.container}>
        <h1>1 column</h1>
        <Masonry columnsCount={1} gutter={'10px'}>
          {items.slice(0, 6).map(item => {
            return (
              <div style={{
                width: '100%',
              }}>
                <img
                  src={bucketUrl + item.PrimaryFile.Name}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  />
              </div>
            )
          })}
        </Masonry>
      </div>
    )
  } else if (layout === 1) {
    return (
      <div className={s.container}>
        <h1>Responsive 1-3 column</h1>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry gutter={ '10px' }>
            {items.slice(0, 20).map(item => {
              return (
                <div style={{
                  width: '100%',
                }}>
                  <img
                    src={bucketUrl + item.PrimaryFile.Name}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    />
                </div>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    )
  } else if (layout === 2) {
    return (
      <div className={s.container}>
        <h1>Responsive 1-4 column</h1>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 320: 1, 400: 2, 750: 3, 900: 4 }}
        >
          <Masonry gutter={ 4 }>
            {items.slice(0, 20).map(item => {
              return (
                <div style={{
                  width: '100%',
                }}>
                  <img
                    src={bucketUrl + item.PrimaryFile.Name}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    />
                </div>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    )
  } else {
    return null;
  }  

  return (
    <div>
      <h1>MASONRY Responsive column</h1>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry gutter={ '10px' }>
          {items.slice(0, 20).map(item => {
            return (
              <div style={{
                width: '100%',
              }}>
                <img
                  src={bucketUrl + item.PrimaryFile.Name}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  />
              </div>
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
      <h1>MASONRY 2 columns</h1>
      <Masonry columnsCount={2} gutter={'10px'}>
        {items.slice(0, 20).map(item => {
          return (
            <div style={{
              width: '100%',
            }}>
              <img
                src={bucketUrl + item.PrimaryFile.Name}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                />
            </div>
          )
        })}
      </Masonry>
      <h1>MASONRY 1 column</h1>
      <Masonry columnsCount={1} gutter={'10px'}>
        {items.slice(0, 6).map(item => {
          return (
            <div style={{
              width: '100%',
            }}>
              <img
                src={bucketUrl + item.PrimaryFile.Name}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                />
            </div>
          )
        })}
      </Masonry>
      <h1>FLEX cropped 1</h1>
      <div style={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
      }}>
        {items.slice(0, 20).map((item, index) => {
          return (
            <div
              className={s.masonryCardTwoOne}
              style={{
                backgroundImage: `url(${bucketUrl + item.PrimaryFile.Name})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: 10,
            }}>
            </div>
          )
        })}
      </div>
      <h1>FLEX cropped 2</h1>
      <div style={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
      }}>
        {items.slice(0, 20).map((item, index) => {
          return (
            <div
              className={s.masonryCardSameSize}
              style={{
                backgroundImage: `url(${bucketUrl + item.PrimaryFile.Name})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: 10,
              }}>
            </div>
          )
        })}
      </div>
      <h1>MASONRY Responsive cropped</h1>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={1} gutter={'10px'}>
          {items.slice(0, 10).map((item, index) => {
            return (
              <div
                className={s.masonryCard3}
                style={{
                  backgroundImage: `url(${bucketUrl + item.PrimaryFile.Name})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
              </div>
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
      <h1>MASONRY END</h1>
    </div>
  )
}