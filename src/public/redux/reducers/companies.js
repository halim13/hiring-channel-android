const initialState = {
  items: [],
  pages: [],
  isLoading: true,
  isError: false,
};

const engineers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_COMPANIES_PENDING':
    case 'FETCH_MORE_DATA_COMPANIES_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_DATA_COMPANIES_FULFILLED':
      return {
        ...state,
        items: action.payload.data.data[0].data,
        pages: action.payload.data.data[0].dataPage,
        isLoading: false,
        isError: false,
      };
    case 'FETCH_LOAD_DATA_COMPANIES_FULFILLED':
      return {
        ...state,
        items: [...state.items, ...action.payload.data.data[0].data],
        pages: action.payload.data.data[0].dataPage,
        isLoading: false,
        isError: false,
      };
    case 'FETCH_DATA_COMPANIES_REJECTED':
    case 'FETCH_MORE_DATA_COMPANIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
export default engineers;
