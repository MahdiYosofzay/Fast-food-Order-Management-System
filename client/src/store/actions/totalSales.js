import { GET_TOTAL_SALES, SALES_UPDATE } from './actionTypes';
import axios from 'axios';

export const getTotalSales = () => async (dispatch) => {
  try {
    const totalSales = await axios.get('/api/orders/total-sales');
    dispatch({
      type: GET_TOTAL_SALES,
      payload: {
        total: totalSales.data,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const salesUpdate = (amount) => (dispatch) => {
  dispatch({
    type: SALES_UPDATE,
    payload: {
      amount,
    },
  });
};
