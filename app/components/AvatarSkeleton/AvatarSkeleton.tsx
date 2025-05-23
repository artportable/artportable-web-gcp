import { styles } from './avatarSkeleton.css'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Skeleton from '@material-ui/lab/Skeleton'

export default function AvatarSkeleton({widthPrimayText = 33, widthSecondaryText = 45}) {
  const s = styles();
  
  //TODO: Maybe fix. This interferred with SSG style rendering...
  // const maxWidth = 85;
  // const minWidth = 20;
  // const widthText1 = `${Math.random() * (maxWidth - minWidth) + minWidth}%`;
  // const widthText2 = `${Math.random() * (maxWidth - minWidth) + minWidth}%`;

  return (
    <Box className={s.box}>
      <Skeleton variant="circle"><Avatar /></Skeleton>
      <div className={s.textBox} >
        <Skeleton width={widthPrimayText} variant="text"></Skeleton>
        <Skeleton width={widthSecondaryText} variant="text"></Skeleton>
      </div>
    </Box>
  );
}