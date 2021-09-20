import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/currentOrder.css';
import {
  removeItem,
  quantityChanged,
  submitted,
} from '../store/actions/currentOrder';
import { isAdded } from '../store/actions/data';
import { orderAdded } from '../store/actions/pendingOrders';

const CurrentOrder = ({
  allItems,
  items,
  orderPrice,
  removeItem,
  quantityChanged,
  isAdded,
  orderAdded,
  submitted,
}) => {
  // let orderPrice = 0;
  const removeItemFromOrder = (id, quantity) => {
    removeItem(id, quantity);
    isAdded(id);
  };

  const quantityChangeHandler = (e, item) => {
    const name = e.currentTarget.name;
    if (name === 'plus') {
      quantityChanged(item._id, 1);
    } else {
      if (item.quantity === 1) {
        return;
      }
      quantityChanged(item._id, -1);
    }
  };

  const submitOrderHandler = () => {
    orderAdded({ items, orderPrice });
    items.map((item) => isAdded(item.itemId));
    submitted();
  };

  return (
    <div className="cont">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        {items !== null &&
          items.length > 0 &&
          items
            .map((item) => {
              const orderItem = allItems.find(
                (element) => element._id === item.itemId
              );
              return { ...orderItem, quantity: item.quantity };
            })
            .map((item) => {
              const total = parseInt(item.quantity) * parseInt(item.price);
              orderPrice += total;
              return (
                <tbody key={item._id}>
                  <tr>
                    <td>{item.itemName}</td>
                    <td>{item.price} AF</td>
                    <td>
                      <div className="number-input">
                        <button
                          name="minus"
                          onClick={(e) => quantityChangeHandler(e, item)}
                        ></button>
                        <input
                          className="quantity"
                          readOnly
                          name="quantity"
                          value={item.quantity}
                          type="number"
                        />
                        <button
                          onClick={(e) => quantityChangeHandler(e, item)}
                          className="plus"
                          name="plus"
                        ></button>
                      </div>
                    </td>
                    <td>{total}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeItemFromOrder(item._id, item.quantity)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        <tfoot>
          <tr>
            <td>Order Price</td>
            <td></td>
            <td></td>
            <td>{orderPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <button
        className="submit-order"
        disabled={!items.length}
        onClick={submitOrderHandler}
      >
        Submit Order
      </button>
    </div>
  );
};
CurrentOrder.propTypes = {
  items: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  isAdded: PropTypes.func.isRequired,
  quantityChanged: PropTypes.func.isRequired,
  orderAdded: PropTypes.func.isRequired,
  submitted: PropTypes.func.isRequired,
  allItems: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.currentOrder.items,
  orderPrice: state.currentOrder.orderPrice,
  allItems: state.data.data,
});

export default connect(mapStateToProps, {
  removeItem,
  isAdded,
  quantityChanged,
  orderAdded,
  submitted,
})(CurrentOrder);
