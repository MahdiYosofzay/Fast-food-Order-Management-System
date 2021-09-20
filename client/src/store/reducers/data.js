import {
  IS_ADDED,
  LOAD_ITEMS,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
} from '../actions/actionTypes';

const initialState = {
  data: [],
  isLoaded: false,
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ITEMS:
      return { data: payload, isLoaded: true };

    case IS_ADDED:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id !== payload.itemId) {
            // This isn't the item we care about - keep it as-is
            return item;
          }

          // Otherwise, this is the one we want - return an updated value

          return {
            ...item,
            isAdded: !item.isAdded,
          };
        }),
      };

    case ADD_NEW_ITEM:
      return {
        ...state,
        data: [...state.data, payload],
      };

    case EDIT_ITEM:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id !== payload._id) {
            // This isn't the item we care about - keep it as-is
            console.log(payload);
            return item;
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...item,
            itemName: payload.itemName,
            price: payload.price,
            category: payload.category,
          };
        }),
      };
    case DELETE_ITEM:
      return {
        ...state,
        data: state.data.filter((item) => item._id !== payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
