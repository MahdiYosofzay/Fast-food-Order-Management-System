import { combineReducers } from 'redux';
import currentOrder from './currentOrder';
import data from './data';
import pendingOrders from './pendingOrders';
import totalSales from './totalSales';
import deliveredOrders from './deliveredOrders';
import categories from './categories';

export default combineReducers({
  currentOrder,
  data,
  pendingOrders,
  totalSales,
  deliveredOrders,
  categories,
});
