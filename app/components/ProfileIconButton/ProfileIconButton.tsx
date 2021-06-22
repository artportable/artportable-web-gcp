import { useState } from 'react'
import Link from 'next/link'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Popover from '@material-ui/core/Popover'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import { useTranslation } from 'next-i18next'
import { useStore } from '../../redux/store'
import styles from './profileIconButton.css'

const ProfileIconButton = () => {
  const store = useStore();
  const s = styles();
  const { t } = useTranslation('header');
  const user = store.getState()?.user;

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(popoverAnchorEl);

  return (
    <>
      <IconButton 
        color="secondary" 
        aria-label="account"
        onClick={(event) => setPopoverAnchorEl(event.currentTarget)}>
        <ProfileAvatar size={30} profilePicture={user.profilePicture}></ProfileAvatar>
      </IconButton>
      <Popover
        open={open}
        anchorEl={popoverAnchorEl}
        onClose={() => setPopoverAnchorEl(null)}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}>
        <ButtonGroup
          classes={{ root: s.buttonGroup }}
          orientation="vertical"
          aria-label="Profile menu"
          size="large"
        >
          <Link href={`/profile/@${user.username}`} passHref>
            <Button
              className={'MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButtonGroup-grouped MuiButtonGroup-groupedVertical MuiButtonGroup-groupedOutlined MuiButtonGroup-groupedOutlinedVertical MuiButtonGroup-groupedOutlined MuiButton-outlinedSizeLarge MuiButton-sizeLarge'}
              href="/"
              startIcon={<ProfileAvatar size={30} profilePicture={user.profilePicture}></ProfileAvatar>}>
              {t('profile')}
            </Button>
          </Link>
          <Button
            
            startIcon={<ExitToAppIcon style={{ fontSize: 30 }} color="action" />}>
            {t('logout')}
          </Button>
        </ButtonGroup>
      </Popover>
    </>
  );
}

export default ProfileIconButton;