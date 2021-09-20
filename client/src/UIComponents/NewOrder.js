import React from 'react';
import ItemList from './ItemList';
import { Link } from 'react-router-dom';

const NewOrder = ({ match }) => {
  let category = '';
  if (match.params.category) category = match.params.category;

  return (
    <div className="container">
      <div className="sidebar">
        <h3>Filter</h3>
        <Link to="/new-order">All</Link>
        <Link to="/new-order/burger">Burgers</Link>
        <Link to="/new-order/chicken">Chicken</Link>
        <Link to="/new-order/sandwich">Sandwiches</Link>
        <Link to="/new-order/drink">Drinks</Link>
      </div>
      <ItemList category={category} />
    </div>
  );
};

export default NewOrder;
