import React, { useEffect, useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import clsx from "clsx";
import { styles } from "./artworkmasonry.css";

export default function ArtworkMasonry({
  layout,
  frame,
  corners,
  shadow,
  items,
  isMyProfile,
}) {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const publicUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const s = styles();
  // const masonryRef = useRef(null);
  // const [msnry, setMsnry] = useState(null);

  const [sortedItems, setSortedItems] = useState([]);

  const sortArtworkByOrderIndex = (a, b) => {
    if (a.OrderIndex > b.OrderIndex) return 1;
    if (a.OrderIndex < b.OrderIndex) return -1;
    return 0;
  };

  useEffect(() => {
    // items && setSortedItems(items.map((item, index) => {
    //   return {
    //     index,
    //     item,
    //   }
    // }));
    setSortedItems(items.sort(sortArtworkByOrderIndex));
    // setSortedItems(items);
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

  // console.log('items', items);
  // console.log('sortedItems', sortedItems);

  const imageStyle = {
    // width: '100%',
    // height: 'auto',
    // border: '1px solid black', // Thin border
    // border: '5px solid black', // Thick border
    // borderRadius: 10,
    // boxShadow: '-3px 3px 8px rgba(0, 0, 0, .2), 3px 3px 8px rgba(0, 0, 0, .2)',
  };
  // const borderColor = 'black';
  // if (frame === 'thin') imageStyle['border'] = `1px solid ${borderColor}`;
  // else if (frame === 'thick') imageStyle['border'] = `5px solid ${borderColor}`;
  // if (corners === 'rounded') imageStyle['borderRadius'] = 10;
  // if (shadow === 'shadow') imageStyle['boxShadow'] = '-3px 3px 8px rgba(0, 0, 0, .2), 3px 3px 8px rgba(0, 0, 0, .2)';

  const imageClasses = clsx({
    [s.thinBorder]: frame === "thin",
    [s.thickBorder]: frame === "thick",
    [s.roundedCorners]: corners === "rounded",
    [s.shadow]: shadow === "shadow",
  });
  console.log("imageClasses", imageClasses);

  const createFooter = () => {
    return (
      <div
        style={{
          width: "100%",
          height: 50,
          border: "2px solid red",
        }}
      ></div>
    );
  };

  if (layout === "evenRows") {
    return (
      <Masonry
        columnsCount={2}
        gutter={"8px"}
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {items.map((item) => {
          return (
            <div
              style={{
                marginBottom: 20, // + gutter = 28
                display: "flex",
                flexFlow: "column nowrap",
              }}
            >
              <div
                // className={s.masonryCardSameSize}
                className={imageClasses}
                style={{
                  width: "100%",
                  backgroundImage: `url(${bucketUrl + item.PrimaryFile.Name})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div style={{ marginTop: "65%" }} />
                {/* Make image width/height ratio always the same. */}
              </div>
              {isMyProfile && createFooter()}
            </div>
          );
        })}
      </Masonry>
    );
  } else if (layout === "twoOne") {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {items.slice(0, 20).map((item, index) => {
          return (
            <div
              className={clsx(s.masonryCardTwoOne, imageClasses)}
              style={{
                backgroundImage: `url(${bucketUrl + item.PrimaryFile.Name})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="ratioDummy" />
            </div>
          );
        })}
      </div>
    );
  } else if (layout === "oneLarge") {
    return (
      <Masonry
        columnsCount={1}
        gutter={"10px"}
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {sortedItems.map((item) => {
          return (
            <div
              style={{
                width: "100%",
              }}
            >
              <img
                src={bucketUrl + item.PrimaryFile.Name}
                className={imageClasses}
                style={{
                  width: "100%",
                  height: "auto",
                  marginBottom: 10, // ≈28px to card below
                }}
              />
            </div>
          );
        })}
      </Masonry>
    );
  } else {
    return (
      <Masonry
        columnsCount={2}
        gutter={"8px"}
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {items.map((item) => {
          return (
            <div
              style={{
                width: "100%",
              }}
            >
              <img
                src={bucketUrl + item.PrimaryFile.Name}
                className={imageClasses}
                style={{
                  width: "100%",
                  height: "auto",
                  marginBottom: 16, // ≈28px to card below
                }}
              />
            </div>
          );
        })}
      </Masonry>
    );
  }
}
