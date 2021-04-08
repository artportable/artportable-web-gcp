import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Profile from '../Profile/Profile'

export default function ProfileCard({ userProfile }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Profile userProfile={userProfile} divider></Profile>
      </CardContent>
    </Card>
  ); 
}