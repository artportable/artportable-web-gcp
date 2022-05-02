import React, { } from "react";
import { Paper } from "@material-ui/core";
import { styles } from "./discoverArtSkeleton.css";
import { Skeleton } from "@material-ui/lab";




export default function DiscoverArtSkeleton({width, height, name}) {
  const s = styles();

  return (
    <div className={s.container}>
      {/* <div className={userToClass(item.name)}> */}
      <div className={s.imageContainer} >
      <Skeleton variant="rect" width={width} height={height} style={
      name === 'Skeleton1' ? {backgroundColor:"#F7DAD6"} : 
      name === 'Skeleton2' ? {backgroundColor:"#FFF9C6"} : 
      name === 'Skeleton3' ? {backgroundColor:"#D8C7B9"} :
      name === 'Skeleton4' ? {backgroundColor:"#C7D0B3"} :
      name === 'Skeleton5' ? {backgroundColor:"#FFF9C6"} :
      name === 'Skeleton6' ? {backgroundColor:"#F7DAD6"} :
      {}}/>
      </div>
      <div className={s.titleAndLike}>
        <div className={s.title}>
          <Skeleton variant="text" width={width/3}/>
        </div>
        <div className={s.like}>
            <Skeleton variant="text" width={20}/>
        </div>
      </div>
    </div>
  );
}
