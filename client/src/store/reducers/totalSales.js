import { SALES_UPDATE, GET_TOTAL_SALES } from '../actions/actionTypes';

const reducer = (state = 0, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TOTAL_SALES:
      return payload.total;

    case SALES_UPDATE:
      return (state += payload.amount);

    default:
      return state;
  }
};

export default reducer;
