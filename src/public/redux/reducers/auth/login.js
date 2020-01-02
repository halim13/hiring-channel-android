import JWT from 'jwt-decode';
const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  user: [],
  error: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING':
    case 'LOGOUT_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        items: action.payload.data,
        user: JWT(action.payload.data.data.token),
        isLoading: false,
        isError: false,
        error: '',
      };
    case 'LOGOUT':
    case 'LOGOUT_FULFILLED':
      return {
        ...state,
        items: [],
        isLoading: false,
        isError: false,
        user: [],
        error: '',
      };
    case 'LOGIN_REJECTED':
    case 'LOGOUT_REJECTED':
      return {
        ...state,
        error: action.payload.response.data.message,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
export default login;
