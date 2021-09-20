import axios from 'axios';
import {
  GET_CATEGORIES,
  ADD_CATEGORIES,
  DELETE_CATEGORIES,
  EDIT_CATEGORY,
} from './actionTypes';

export const getAllCategories = () => async (dispatch) => {
  console.log('ssss');
  try {
    const res = await axios.get('/api/categories');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addNewCategory = (name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post('/api/categories/add-category', body, config);
    dispatch({
      type: ADD_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const editCategory = (category) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(category);

  try {
    const res = await axios.put('/api/categories/edit-category', body, config);
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/categories/delete-category/${id}`);

    dispatch({
      type: DELETE_CATEGORIES,
      payload: { id },
    });
  } catch (error) {
    console.log(error);
  }
};
