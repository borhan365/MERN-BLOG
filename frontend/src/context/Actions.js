
export const loginStart = (userCreadientials) => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFail = () => ({
  type: "LOGIN_FAIL"
});

export const logout = () => ({
  type: "LOGOUT"
});