const initialState = {
  items: [],
  isLoading: true,
  messageError: '',
};

const singleEngineers = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'FETCH_SINGLE_DATA_ENGINEER_PENDING':
    case 'UPDATE_DATA_ENGINEER_PENDING':
    case 'DELETE_DATA_ENGINEER_PENDING':
    case 'CLEAR_SINGLE_ENGINEER_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_SINGLE_DATA_ENGINEER_FULFILLED':
      return {
        ...state,
        items: action.payload.data.engineersData[0],
        isLoading: false,
        messageError: '',
      };
    case 'UPDATE_DATA_ENGINEER_FULFILLED':
      return {
        ...state,
        items: action.payload.data[0].data,
        isLoading: false,
        messageError: '',
      };
    case 'DELETE_DATA_ENGINEER_FULFILLED':
      return {
        ...state,
        items: action.payload.data.engineersData,
        data: action.data,
        isLoading: false,
      };
    case 'CLEAR_SINGLE_ENGINEER':
    case 'CLEAR_SINGLE_ENGINEER_FULFILLED':
      return {
        ...state,
        items: [],
        isLoading: false,
        messageError: '',
      };
    case 'FETCH_SINGLE_DATA_ENGINEER_REJECTED':
    case 'UPDATE_DATA_ENGINEER_REJECTED':
    case 'DELETE_DATA_ENGINEER_REJECTED':
    case 'CLEAR_SINGLE_ENGINEER_REJECTED':
      return {
        ...state,
        isLoading: false,
        messageError: action.payload.response.data,
      };
    default:
      return state;
  }
};
export default singleEngineers;
