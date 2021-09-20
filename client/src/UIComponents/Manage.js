import React, { useEffect } from 'react';
import './styles/manage.css';
import { Link, Route, Switch } from 'react-router-dom';
import AllItems from './manage-components/AllItems';
import Categories from './manage-components/Categories';
import { getAllCategories } from '../store/actions/categories';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Manage = ({ getAllCategories }) => {
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="manage--container">
      <div className="sidebar">
        <h3>Manage Data</h3>
        <Link to="/manage/items">Items</Link>
        <Link to="/manage/categories">Categories</Link>
      </div>
      <div>
        <Switch>
          <Route path="/manage/items" exact component={AllItems} />
          <Route path="/manage/categories" exact component={Categories} />
        </Switch>
      </div>
    </div>
  );
};

Manage.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps, { getAllCategories })(Manage);
