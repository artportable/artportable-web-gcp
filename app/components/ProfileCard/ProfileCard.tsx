import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Profile from '../Profile/Profile'

import { styles } from './profileCard.css'

export default function ProfileCard({ userId, user }) {
  const s = styles();

  return (
    <Card elevation={2}>
      <CardContent>
        <Profile userId={userId} user={user}></Profile>
      </CardContent>
    </Card>
  ); 
}