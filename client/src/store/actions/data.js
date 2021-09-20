import axios from 'axios';
import {
  IS_ADDED,
  LOAD_ITEMS,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
} from './actionTypes';

export const loadItems = () => async (dispatch) => {
  try {
    const result = await axios.get('/api/items');

    dispatch({
      type: LOAD_ITEMS,
      payload: result.data,
    });
  } catch (error) {
    console.log('Data action file:', error.message);
  }
};

export const isAdded = (itemId) => {
  return {
    type: IS_ADDED,
    payload: {
      itemId,
    },
  };
};

export const addNewItem = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post('/api/items/add-item', body, config);

    dispatch({
      type: ADD_NEW_ITEM,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const editItem = (item) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(item);

  try {
    const res = await axios.put('/api/items/edit-item', body, config);
    dispatch({
      type: EDIT_ITEM,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/items/delete-item/${id}`);

    dispatch({
      type: DELETE_ITEM,
      payload: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
