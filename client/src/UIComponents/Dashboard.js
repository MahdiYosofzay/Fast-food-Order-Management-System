import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/dashboard.css';
import OrderCard from './OrderCard';
import { orderDelivered } from '../store/actions/pendingOrders';
import { salesUpdate } from '../store/actions/totalSales';
import { addToDelivered } from '../store/actions/deliveredOrders';
import { cancelOrder } from '../store/actions/pendingOrders';
import { getDeliveredOrders } from '../store/actions/deliveredOrders';
import moment from 'moment';

const Dashboard = ({
  pendingOrders,
  deliveredOrders,
  totalSales,
  orderDelivered,
  salesUpdate,
  addToDelivered,
  cancelOrder,
  getDeliveredOrders,
}) => {
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

  const dateChangeHandler = (e) => {
    const value = e.target.value;
    setDate(value);
  };

  useEffect(() => {
    getDeliveredOrders(moment(date).format('M-D-YYYY'));
  }, [date]);

  //if pendingTab set to true the pending orders will be shown, otherwise delivered orders will be shown
  const [tab, setTab] = useState('pending');

  const setTabHandler = (value) => {
    setTab(value);
  };

  const deliveredHandler = (orderId, orderPrice) => {
    salesUpdate(orderPrice);
    orderDelivered(orderId);
    addToDelivered(orderId);
  };

  const cancelOrderHandler = (orderId) => {
    cancelOrder(orderId);
  };

  return (
    <div className="main-container">
      <div className="section1">
        <h3>Today's Total Sales</h3>
        <h1>{totalSales} AF</h1>
      </div>
      <div className="section2">
        <div className="tabs">
          <button
            className={tab === 'pending' ? 'tab tab-active rtl' : 'tab'}
            onClick={() => setTabHandler('pending')}
          >
            Pending Orders
          </button>
          <button
            className={tab === 'delivered' ? 'tab tab-active ltr' : 'tab'}
            onClick={() => setTabHandler('delivered')}
          >
            Delivered Orders
          </button>
        </div>
        <div>
          {/* map through pending orders to show them individually */}
          {tab === 'pending' ? (
            pendingOrders.length > 0 ? (
              //Pending Tab
              <div className="orders">
                {pendingOrders.map((order) => {
                  return (
                    <div className="table-container" key={order._id}>
                      <OrderCard order={order} />
                      <button
                        className="delivered-btn"
                        onClick={() =>
                          deliveredHandler(order._id, order.orderPrice)
                        }
                      >
                        Delivered
                      </button>
                      <button
                        className="delivered-btn"
                        onClick={() => cancelOrderHandler(order._id)}
                      >
                        Cancel Order
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-order">Pending orders are showing here.</p>
            )
          ) : (
            //Delivered Tab
            <div>
              <div className="date-container">
                <label for="date" className="label">
                  Date of Orders:
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  className="datepicker"
                  onChange={(e) => dateChangeHandler(e)}
                />
              </div>
              <div className="orders">
                {deliveredOrders.length > 0 ? (
                  deliveredOrders.map((order) => {
                    return (
                      <div className="table-container" key={order._id}>
                        <OrderCard order={order} />
                      </div>
                    );
                  })
                ) : (
                  <p className="no-order">Delivered orders are showing here.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  pendingOrders: PropTypes.array.isRequired,
  deliveredOrders: PropTypes.array.isRequired,
  totalSales: PropTypes.number.isRequired,
  orderDelivered: PropTypes.func.isRequired,
  salesUpdate: PropTypes.func.isRequired,
  addToDelivered: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  getDeliveredOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pendingOrders: state.pendingOrders,
  deliveredOrders: state.deliveredOrders,
  totalSales: state.totalSales,
});

export default connect(mapStateToProps, {
  orderDelivered,
  salesUpdate,
  addToDelivered,
  cancelOrder,
  getDeliveredOrders,
})(Dashboard);
