import * as actions from '../actions/actionTypes';

const initialState = { items: [], orderPrice: 0, itemsNumber: 0 };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.ITEM_ADDED:
      return {
        ...state,
        items: [...state.items, payload],
        itemsNumber: state.itemsNumber + 1,
      };

    case actions.QUANTITY_CHANGED:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.itemId !== payload.itemId) {
            // This isn't the item we care about - keep it as-is
            return item;
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...item,
            quantity: item.quantity + payload.quantity,
          };
        }),
        itemsNumber: state.itemsNumber + payload.quantity,
      };

    case actions.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.itemId !== payload.itemId),
        itemsNumber: state.itemsNumber - payload.quantity,
      };

    case actions.ORDER_PRICE_CHANGED:
      return { ...state, orderPrice: payload.orderPrice };

    case actions.SUBMITTED:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
