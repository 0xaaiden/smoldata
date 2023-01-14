
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, authIsReady: false };
    case 'AUTH_IS_READY':
      // console.log('authReducer', action);
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};
