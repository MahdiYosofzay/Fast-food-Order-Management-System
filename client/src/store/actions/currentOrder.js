import * as actions from './actionTypes';

export const addItem = (itemId) => (dispatch) => {
  dispatch({
    type: actions.ITEM_ADDED,
    payload: {
      itemId,
      quantity: 1,
    },
  });
};

export const quantityChanged = (itemId, quantity) => {
  return {
    type: actions.QUANTITY_CHANGED,
    payload: {
      itemId,
      quantity,
    },
  };
};

export const removeItem = (itemId, quantity) => (dispatch) => {
  dispatch({
    type: actions.REMOVE_ITEM,
    payload: {
      itemId,
      quantity,
    },
  });
};

export const orderPriceChange = (orderPrice) => (dispatch) => {
  dispatch({
    type: actions.ORDER_PRICE_CHANGED,
    payload: {
      orderPrice,
    },
  });
};

export const submitted = () => (dispatch) => {
  dispatch({
    type: actions.SUBMITTED,
  });
};
