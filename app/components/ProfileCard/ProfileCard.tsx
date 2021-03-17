import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Profile from '../Profile/Profile'

export default function ProfileCard({ userId, user }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Profile userId={userId} user={user}></Profile>
      </CardContent>
    </Card>
  ); 
}