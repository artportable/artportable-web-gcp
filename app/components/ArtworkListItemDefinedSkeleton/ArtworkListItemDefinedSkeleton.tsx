import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton';
import { styles } from './artworkListItemDefinedSkeleton.css'

export default function ArtworkListItemDefinedSkeleton({ grow }) {
  const s = styles();
  
  return (
    <>
      <Paper variant="outlined" className={s.container} style={{ flexGrow: grow }}>
        <div className={s.imageContainer}>
          <Skeleton height={260} variant='rect'></Skeleton>
        </div>
        <div className={s.titleAndLike}>
          <Skeleton style={{ width: '20px'}}></Skeleton>
          <Skeleton style={{ width: '100%'}}></Skeleton>
        </div>
      </Paper>
    </>
  );
}