import React from 'react';
import './styles/item.css';
import { connect } from 'react-redux';
import { addItem, quantityChanged } from '../store/actions/currentOrder';
import { isAdded } from '../store/actions/data';
import PropTypes from 'prop-types';

function Item({ addItem, quantityChanged, isAdded, item, quantity }) {
  const itemAdded = () => {
    addItem(item._id);
    isAdded(item._id);
  };

  const quantityChangeHandler = (e) => {
    const name = e.currentTarget.name;
    if (name === 'plus') {
      quantityChanged(item._id, 1);
    } else {
      if (quantity === 1) {
        return;
      }
      quantityChanged(item._id, -1);
    }
  };

  return (
    <div className="item">
      <h2>{item.itemName}</h2>
      <p>{item.category}</p>
      <h4>{item.price} AF</h4>
      <button
        className={item.isAdded ? 'addToCard add-btn-hide' : 'addToCard'}
        onClick={itemAdded}
      >
        Add to Card
      </button>
      <div
        className={
          item.isAdded
            ? 'counter-container '
            : 'counter-container c-btn-dis-none'
        }
      >
        <div className="item--number-input">
          <button name="minus" onClick={quantityChangeHandler}></button>
          <input
            className="item--quantity"
            readOnly
            name="quantity"
            value={quantity}
            type="number"
          />
          <button
            onClick={quantityChangeHandler}
            className="item--plus"
            name="plus"
          ></button>
        </div>
        {/* <button
          onClick={quantityChangeHandler}
          className="counter counter-btn"
          name="minus"
        >
          -
        </button>
        <p className="counter counter-view">{quantity}</p>
        <button
          onClick={quantityChangeHandler}
          className="counter counter-btn"
          name="plus"
        >
          +
        </button> */}
      </div>
    </div>
  );
}

Item.propTypes = {
  addItem: PropTypes.func.isRequired,
  quantityChanged: PropTypes.func.isRequired,
  isAdded: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   order: state.order,
// });

export default connect(null, { addItem, quantityChanged, isAdded })(Item);
