import { LOAD_DELIVERED_ORDERS, ADD_TO_DELIVERED } from './actionTypes';
import axios from 'axios';

export const getDeliveredOrders = (date) => async (dispatch) => {
  try {
    const result = await axios.get(`/api/orders/delivered-orders/${date}`);

    dispatch({
      type: LOAD_DELIVERED_ORDERS,
      payload: {
        deliveredOrders: result.data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToDelivered = (orderId) => async (dispatch) => {
  try {
    const result = await axios.get(`/api/orders/order/${orderId}`);

    dispatch({
      type: ADD_TO_DELIVERED,
      payload: {
        order: result.data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
