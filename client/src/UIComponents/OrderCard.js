import { connect } from 'react-redux';
import React from 'react';

const OrderCard = ({ order, allItems }) => {
  //Find each item specification e.g name,price.... by its id from data collection
  const findItemsById = (items, data) => {
    return items.map((item) => {
      const fetchedItem = data.find((element) => element._id === item.itemId);
      return { ...fetchedItem, quantity: item.quantity };
    });
  };

  return (
    <table className="order">
      <thead>
        <tr>
          <th>Name</th>
          <th>quantity</th>
        </tr>
      </thead>
      <tbody>
        {findItemsById(order.items, allItems).map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>Total Price</td>
          <td>{order.orderPrice}</td>
        </tr>
      </tfoot>
    </table>
  );
};

const mapStateToProps = (state) => ({
  allItems: state.data.data,
});
export default connect(mapStateToProps)(OrderCard);
