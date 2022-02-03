import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadItems } from '../store/actions/data';
import { getPendingOrders } from '../store/actions/pendingOrders';
import { getTotalSales } from '../store/actions/totalSales';
import { connect } from 'react-redux';
import NewOrder from './NewOrder';
import CurrentOrder from './CurrentOrder';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Manage from './Manage';
import { Route, Switch } from 'react-router-dom';

const Container = ({ loadItems, getPendingOrders, getTotalSales }) => {
  useEffect(() => {
    loadItems();
    getPendingOrders();
    getTotalSales();
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          <Route path="/" exact component={NewOrder} />
          <Route path="/orders" exact component={Dashboard} />
          <Route path="/new-order" exact component={NewOrder} />
          <Route path="/new-order/:category" exact component={NewOrder} />
          <Route path="/current-order" exact component={CurrentOrder} />
          <Route path="/manage" exact component={Manage} />
          <Route path="/manage/:section" exact component={Manage} />
        </Switch>
      </div>
    </div>
  );
};

Container.propTypes = {
  loadItems: PropTypes.func.isRequired,
  getPendingOrders: PropTypes.func.isRequired,
  getTotalSales: PropTypes.func.isRequired,
};

export default connect(null, {
  loadItems,
  getPendingOrders,
  getTotalSales,
})(Container);
