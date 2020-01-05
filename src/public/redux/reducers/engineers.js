const initialState = {
  items: [],
  pages: [],
  isLoading: true,
  isLoadMode: false,
  isError: false,
};

const engineers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_ENGINEERS_PENDING':
    case 'FETCH_DATA_ENGINEERS_REJECTED':
    case 'FETCH_LOAD_DATA_ENGINEERS_REJECTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_LOAD_DATA_ENGINEERS_PENDING':
      return {
        ...state,
        isLoadMore: true,
      };
    case 'FETCH_LOAD_DATA_ENGINEERS_FULFILLED':
      return {
        ...state,
        items: [...state.items, ...action.payload.data.engineersData],
        pages: action.payload.data.pageDetail,
        isLoading: false,
        isLoadMore: false,
        isError: false,
      };
    case 'CLEAR_ENGINEERS':
    case 'CLEAR_ENGINEERS_FULFILLED':
      return {
        ...state,
        items: [],
        pages: [],
        isLoading: false,
        isLoadMore: false,
        isError: false,
      };
    case 'FETCH_DATA_ENGINEERS_FULFILLED':
      return {
        ...state,
        items: action.payload.data.engineersData,
        pages: action.payload.data.pageDetail,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
export default engineers;
