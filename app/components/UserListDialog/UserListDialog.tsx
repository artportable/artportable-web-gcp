import Link from 'next/link'
import { Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useGetFollowers } from '../../hooks/useGetFollowers';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { styles } from './userListDialog.css'

type Props = {
  title: string,
  users: any[],
  open: boolean,
  onClose: () => void,
}

const UserListDialog = ({ title, users, open, onClose }: Props) => {
  const s = styles();

  // const users = useGetFollowers(user);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle id="user-dialog">{title}</DialogTitle>
      <List>
        {users.map((user, i) => (
          <Link href={`/profile/@${user.username}`}>
            <a>
              <ListItem button onClick={() => onClose()} key={i}>
                <ListItemAvatar>
                  <ProfileAvatar size={38} profilePicture={undefined}></ProfileAvatar>
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    </Dialog>
  );
}

export default UserListDialog;