//Action Types
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE"


//Action Creator
export const loginUser = () => ({
   type: LOGIN_USER
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const updateProfilePicture = () => ({
  type: UPDATE_PROFILE_PICTURE
});