import {
  GET_CATEGORIES,
  ADD_CATEGORIES,
  DELETE_CATEGORIES,
  EDIT_CATEGORY,
} from '../actions/actionTypes';

const reducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return payload;
    case ADD_CATEGORIES:
      return [...state, payload];
    case EDIT_CATEGORY:
      return state.map((category) => {
        if (category._id !== payload._id) {
          // This isn't the category we care about - keep it as-is
          return category;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...category,
          name: payload.name,
        };
      });
    case DELETE_CATEGORIES:
      return state.filter((category) => category._id !== payload.id);
    default:
      return state;
  }
};

export default reducer;
