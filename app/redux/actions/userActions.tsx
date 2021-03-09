//Action Types
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";


//Action Creator
export const loginUser = () => ({
   type: LOGIN_USER
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});
