const initialState = {
  loggedIn: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
