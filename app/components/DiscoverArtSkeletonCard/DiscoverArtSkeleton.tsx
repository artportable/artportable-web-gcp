import React, { } from "react";
import { Paper } from "@material-ui/core";
import { styles } from "./discoverArtSkeleton.css";
import { Skeleton } from "@material-ui/lab";




export default function DiscoverArtSkeleton({width, height, name}) {
  const s = styles();

  // function userToClass(name){
  //   let userClass = '';
  //   if(name === 'Skeleton1') {
  //      userClass = 'left';
  //   }
  //   else 
  //      userClass = 'right';
  //   }
  
  //   return userClass ;
  // }


  return (
    <div className={s.container}>
      {/* <div className={userToClass(item.name)}> */}
      <div className={s.imageContainer} style={
      name === 'Skeleton1' ? {backgroundColor:"#C67777"} : 
      name === 'Skeleton2' ? {backgroundColor:"#E1D1C5"} : 
      name === 'Skeleton3' ? {backgroundColor:"#A35D5D"} :
      name === 'Skeleton4' ? {backgroundColor:"#48423D"} :
      name === 'Skeleton5' ? {backgroundColor:"#C67777"} :
      name === 'Skeleton5' ? {backgroundColor:"#A35D5D"} :
      {}}>
      <Skeleton variant="rect" width={width} height={height} animation='pulse' />
      </div>
      <div className={s.titleAndLike}>
        <div className={s.title}><Skeleton variant="text" width={width/3}/></div>
        <div className={s.like}>
            <Skeleton variant="text" width={20} />
        </div>
      </div>
    </div>
  );
}
