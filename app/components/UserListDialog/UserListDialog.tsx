import Link from 'next/link'
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemAvatar, ListItemText, CircularProgress } from '@material-ui/core'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import { styles } from './userListDialog.css'
import FetchData from '../../models/FetchData'

type Props = {
  title: string,
  users: FetchData<any[]>,
  open: boolean,
  onClose: () => void,
}

const UserListDialog = ({ title, users, open, onClose }: Props) => {
  const s = styles();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle id="user-dialog">{title}</DialogTitle>
      <DialogContent>
        {users.loading &&
          <div className={s.spinnerContainer}>
            <CircularProgress />
          </div>
        }

        {users.data ?
          <List>
            {users.data?.map((user, i) => (
              <Link key={i} href={`/profile/@${user.username}`}>
                <a>
                  <ListItem button onClick={() => onClose()}>
                    <ListItemAvatar>
                      <ProfileAvatar size={38} profilePicture={user.profilePicture}></ProfileAvatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.username} />
                  </ListItem>
                </a>
              </Link>
            ))}
          </List>
          :
          <div>error</div>
        }

      </DialogContent>
    </Dialog>
  );
}

export default UserListDialog;
