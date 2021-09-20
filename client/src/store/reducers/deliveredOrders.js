import {
  LOAD_DELIVERED_ORDERS,
  ADD_TO_DELIVERED,
} from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_DELIVERED_ORDERS:
      return [...payload.deliveredOrders];

    case ADD_TO_DELIVERED:
      return [...state, payload.order];
    default:
      return state;
  }
};

export default reducer;
