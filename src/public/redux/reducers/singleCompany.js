const initialState = {
  items: [],
  isLoading: true,
};

const singleCompany = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'FETCH_SINGLE_DATA_COMPANY_PENDING':
    case 'FETCH_SINGLE_DATA_COMPANY_REJECTED':
    case 'UPDATE_DATA_COMPANY_PENDING':
    case 'UPDATE_DATA_COMPANY_REJECTED':
    case 'DELETE_DATA_COMPANY_PENDING':
    case 'DELETE_DATA_COMPANY_REJECTED':
    case 'CLEAR_SINGLE_COMPANY_PENDING':
    case 'CLEAR_SINGLE_COMPANY_REJECTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_SINGLE_DATA_COMPANY_FULFILLED':
      return {
        ...state,
        items: action.payload.data.data[0],
        isLoading: false,
        isLoadingFirst: false,
      };
    case 'CLEAR_SINGLE_COMPANY':
    case 'CLEAR_SINGLE_COMPANY_FULFILLED':
      return {
        ...state,
        items: [],
        isLoading: false,
      };
    case 'UPDATE_DATA_COMPANY_FULFILLED':
      return {
        ...state,
        items: action.payload.data.data,
        isLoading: false,
        isLoadingFirst: false,
      };
    case 'DELETE_DATA_COMPANY_FULFILLED':
      return {
        ...state,
        items: action.payload.data.data,
        isLoading: false,
        isLoadingFirst: false,
      };
    default:
      return state;
  }
};
export default singleCompany;
