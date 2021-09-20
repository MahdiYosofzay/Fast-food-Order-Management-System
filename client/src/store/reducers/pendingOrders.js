import * as actions from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.LOAD_PENDING_ORDERS:
      return [...payload.pendingOrders];

    case actions.ORDER_ADDED:
      return [...state, payload];

    case actions.ORDER_DELIVERED:
    case actions.CANCEL_ORDER:
      return state.filter((order) => order._id !== payload.orderId);

    default:
      return state;
  }
};

export default reducer;
