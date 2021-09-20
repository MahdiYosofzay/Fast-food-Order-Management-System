import React, { useState } from 'react';
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
  editCategory,
} from '../../store/actions/categories';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Categories = ({
  categories,
  addNewCategory,
  deleteCategory,
  getAllCategories,
  editCategory,
}) => {
  const [name, setName] = useState('');
  const [editState, setEditState] = useState({ status: false, category: null });

  const onChangeHandler = (e) => {
    const name = e.currentTarget.value;
    setName(name);
    if (editState) {
      setEditState((prevValue) => {
        return { ...prevValue, category: { ...prevValue.category, name } };
      });
    }
  };

  const editCategoryHandler = (category) => {
    setEditState({ status: true, category });
    setName(category.name);
  };

  const dataEditHandler = () => {
    editCategory(editState.category);
    setEditState({ status: false, category: null });
  };

  const deleteCategoryHandler = (id) => {
    const isConfirmed = window.confirm('Are you sure?');
    if (isConfirmed) deleteCategory(id);
    else return;
  };

  const dataSubmitHandler = () => {
    addNewCategory(name);
    setName('');
    getAllCategories();
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
      <div className="navigation__nav">
        <div className="navigation__form">
          <h1 className="form-header">Add a New Cagtegory</h1>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChangeHandler}
            className="form-input category-name-input"
            placeholder="e.g. burger"
            value={name}
            required
          />

          <button className="submit-btn" onClick={dataSubmitHandler}>
            Submit
          </button>
        </div>
      </div>
      {categories.map((category) => {
        return (
          <div className="profile-container" key={category._id}>
            <table className="profile-table">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{category.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="profile--btn-container">
              <button
                className="profile-btn delete-btn"
                onClick={() => deleteCategoryHandler(category._id)}
              >
                Delete
              </button>
              <button
                className="profile-btn edit-btn"
                onClick={() => editCategoryHandler(category)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
      <div className={editState.status ? 'show-on' : 'show-off'}>
        <div className="edit-form category-edit-form">
          <h1 className="form-header">Edit Cagtegory</h1>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChangeHandler}
            className="form-input category-name-input"
            placeholder="e.g. burger"
            value={name}
            required
          />

          <button className="submit-btn" onClick={dataEditHandler}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

Categories.propTypes = {
  addNewCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps, {
  addNewCategory,
  deleteCategory,
  getAllCategories,
  editCategory,
})(Categories);
