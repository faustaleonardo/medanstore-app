export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'FETCH_USER':
      return { ...state, auth: payload || false };
    case 'LOGIN':
      return { ...state, auth: payload || false };
    case 'SIGNUP':
      return { ...state, auth: payload || false };
    case 'LOGOUT':
      return { ...state, auth: false };
    case 'AUTH_ERROR':
      return { ...state, error: payload };
    default:
      return state;
  }
};
