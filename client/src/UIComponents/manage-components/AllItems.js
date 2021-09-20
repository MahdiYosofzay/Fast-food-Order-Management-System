import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.css';
import PropTypes from 'prop-types';
import { addNewItem, deleteItem, editItem } from '../../store/actions/data';
import { loadItems } from '../../store/actions/data';

const AllItems = ({
  items,
  addNewItem,
  deleteItem,
  categories,
  loadItems,
  editItem,
}) => {
  const initialState = {
    name: '',
    price: '',
    category: 'burger',
  };

  const editInitialState = { status: false, itemId: null };

  const [data, setData] = useState(initialState);
  const [editState, setEditState] = useState(editInitialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const editItemHandler = (item) => {
    setEditState({ status: true, itemId: item._id });
    setData({
      name: item.itemName,
      price: item.price,
      category: item.category,
    });
  };

  const dataEditHandler = () => {
    editItem({ ...data, _id: editState.itemId });
    setEditState(editInitialState);
    setData(initialState);
  };

  const deleteItemHandler = (id) => {
    const isConfirmed = window.confirm('Are you sure?');
    if (isConfirmed) deleteItem(id);
    else return;
  };

  const dataSubmitHandler = () => {
    addNewItem(data);
    setData(initialState);
    loadItems();
  };

  return (
    <div className="profile--main-container">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">
          <i className="fad fa-plus fa-3x"></i>
        </span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <div className="navigation__form">
          <h1 className="form-header">Add a New Item</h1>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChangeHandler}
            className="form-input"
            placeholder="e.g. Simple Burger"
            value={data.name}
            required
          />

          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={onChangeHandler}
            className="form-input"
            placeholder="e.g. 50"
            value={data.price}
            required
          />

          <label htmlFor="category-select" className="form-label">
            Category
          </label>
          <select
            name="category"
            id="category-select"
            className="form-input category-name-input"
            onChange={onChangeHandler}
            value={data.category}
          >
            {categories.map((category) => {
              return (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <button className="submit-btn" onClick={dataSubmitHandler}>
            Submit
          </button>
        </div>
      </nav>

      {items.map((item) => {
        return (
          <div className="profile-container" key={item._id}>
            <table className="profile-table">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{item.itemName}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{item.price}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{item.category}</td>
                </tr>
              </tbody>
            </table>
            <div className="profile--btn-container">
              <button
                className="profile-btn delete-btn"
                onClick={() => deleteItemHandler(item._id)}
              >
                Delete
              </button>
              <button
                className="profile-btn edit-btn"
                onClick={() => editItemHandler(item)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
      <div className={editState.status ? 'show-on' : 'show-off'}>
        <div className="edit-form item-edit-form">
          <h1 className="form-header">Edit Item</h1>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChangeHandler}
            className="form-input"
            placeholder="e.g. burger"
            value={data.name}
            required
          />

          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={onChangeHandler}
            className="form-input"
            placeholder="e.g. 50"
            value={data.price}
            required
          />

          <label htmlFor="category-select" className="form-label">
            Category
          </label>
          <select
            name="category"
            id="category-select"
            className="form-input category-name-input"
            onChange={onChangeHandler}
            value={data.category}
          >
            {categories.map((category) => {
              return (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <button className="submit-btn" onClick={dataEditHandler}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

AllItems.propTypes = {
  addNewItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  loadItems: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.data.data,
  categories: state.categories,
});
export default connect(mapStateToProps, {
  addNewItem,
  deleteItem,
  loadItems,
  editItem,
})(AllItems);
