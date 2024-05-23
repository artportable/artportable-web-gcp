import React, { useContext } from 'react'
import { LoginContext } from '../../contexts/login-context';
import LoginDialog from '../Popups/LoginDialog';

export default function GlobalComponents() {

  const { loginDialogOpen, closeLoginDialog } = useContext(LoginContext);

  return (
    <>
      <LoginDialog
        loginDialogOpen={loginDialogOpen}
        handleCloseLoginDialog={closeLoginDialog}
      />
    </>
  )
}