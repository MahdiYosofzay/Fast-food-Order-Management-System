import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import { connect } from 'react-redux';

const Navbar = ({ itemsNumber }) => {
  return (
    <nav className="navbar">
      <h1>
        Dehkadah <i className="fas fa-cheeseburger"></i>
      </h1>
      <ul>
        <li>
          <Link to="/manage">Manage</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/new-order">New Order</Link>
        </li>
        <li>
          <Link to="/current-order" className="basket">
            <span className={itemsNumber > 0 ? 'items-number' : 'empty'}>
              {itemsNumber}
            </span>
            <i className="fad fa-shopping-cart fa-lg"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  itemsNumber: state.currentOrder.itemsNumber,
});

export default connect(mapStateToProps)(Navbar);
