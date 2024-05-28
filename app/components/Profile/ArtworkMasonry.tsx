import React, { useContext, useEffect, useState } from "react";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import Masonry from '@mui/lab/Masonry';

export default function ArtworkMasonry({ items }) {
  // const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  // const publicUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div style={{
      // display: 'flex',
      // flexFlow: 'row wrap',
    }}>
      <h1>MASONRY</h1>
      {/* <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry>
          {items.map(item => {
            return (
              <div>
                <img src={bucketUrl + item.PrimaryFile.Name} />
              </div>
            )
          })}
        </Masonry>
      </ResponsiveMasonry> */}
    </div>
  )
}