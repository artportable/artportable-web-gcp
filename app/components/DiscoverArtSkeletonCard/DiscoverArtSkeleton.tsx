import React, { } from "react";
import { Paper } from "@material-ui/core";
import { styles } from "./discoverArtSkeleton.css";
import { Skeleton } from "@material-ui/lab";


export default function DiscoverArtSkeleton({width, height}) {
  const s = styles();
  return (
    <Paper className={s.container}>
      <div className={s.imageContainer}>
      <Skeleton variant="rect" width={width} height={height} />
      </div>
      <div className={s.titleAndLike}>
        <div className={s.title}><Skeleton variant="text" width={width/3}/></div>
        <div className={s.like}>
            <Skeleton variant="text" width={20} />
        </div>
      </div>
    </Paper>
  );
}
