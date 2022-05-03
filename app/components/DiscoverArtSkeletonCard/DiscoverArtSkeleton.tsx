import React, { } from "react";
import { Paper } from "@material-ui/core";
import { styles } from "./discoverArtSkeleton.css";
import { Skeleton } from "@material-ui/lab";




export default function DiscoverArtSkeleton({width, height}) {
  const s = styles();

  return (
    <div className={s.container}>
      {/* <div className={userToClass(item.name)}> */}
      <div className={s.imageContainer} >
      <Skeleton variant="rect" width={width} height={height} className={s.skeletonColor}/>
      </div>
      <div className={s.titleAndLike}>
        <div className={s.title}>
          <Skeleton variant="text" width={width/3} className={s.skeletonColor}/>
        </div>
        <div className={s.like}>
            <Skeleton variant="text" width={20} className={s.skeletonColor}/>
        </div>
      </div>
    </div>
  );
}
