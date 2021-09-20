import * as actions from './actionTypes';
import axios from 'axios';

export const getPendingOrders = () => async (dispatch) => {
  try {
    const result = await axios.get('/api/orders/pending-orders');

    dispatch({
      type: actions.LOAD_PENDING_ORDERS,
      payload: {
        pendingOrders: result.data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderAdded =
  ({ items, orderPrice }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ items, orderPrice });

    try {
      const res = await axios.post('/api/orders', body, config);

      dispatch({
        type: actions.ORDER_ADDED,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

export const orderDelivered = (orderId) => async (dispatch) => {
  try {
    await axios.put(`/api/orders/${orderId}`);
    dispatch({
      type: actions.ORDER_DELIVERED,
      payload: {
        orderId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    await axios.delete(`/api/orders/delete-order/${orderId}`);
    dispatch({
      type: actions.CANCEL_ORDER,
      payload: {
        orderId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
