const initialState = {
  items: [],
  isLoading: false,
  error: '',
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        items: action.payload.data,
        isLoading: false,
        error: '',
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        error: action.payload.response.data.message,
        isLoading: false,
      };
    default:
      return state;
  }
  return state;
};
export default register;
