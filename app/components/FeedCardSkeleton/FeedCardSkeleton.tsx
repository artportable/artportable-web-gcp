import { styles } from './feedCardSkeleton.css'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Skeleton from '@material-ui/lab/Skeleton'
import AvatarSkeleton from '../AvatarSkeleton/AvatarSkeleton'


export default function FeedCardSkeleton() {
  const s = styles();

  return (
    <Card>
      <CardHeader avatar={<AvatarSkeleton widthPrimayText={100} widthSecondaryText={166}></AvatarSkeleton>}>
      </CardHeader>

      <CardMedia>
        <Skeleton variant="rect" height={300} />
      </CardMedia>
      <CardActions>
        <div className={s.actions}>
          <Skeleton variant="text" width={30} height={20} />
          <Skeleton variant="text" width={30} height={20} />
        </div>
      </CardActions>
    </Card>
  );
}