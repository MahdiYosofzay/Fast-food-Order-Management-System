import React from 'react';
import Item from './Item';
import './styles/itemsList.css';
import { connect } from 'react-redux';

const ItemList = ({ items, category, dataObj: { data, isLoaded } }) => {
  return (
    <div className="item-container">
      {isLoaded ? (
        category === '' ? (
          data.map((item) => {
            let q = null;
            if (items !== null && items.length > 0) {
              items.forEach((element) => {
                if (element.itemId === item._id) {
                  q = element.quantity;
                }
              });
            }
            return <Item key={item._id} item={item} quantity={q} />;
          })
        ) : (
          data
            .filter((item) => item.category === category)
            .map((item) => {
              let q = null;

              if (items !== null && items.length > 0) {
                items.forEach((element) => {
                  if (element.itemId === item._id) {
                    q = element.quantity;
                  }
                });
              }
              return <Item key={item._id} item={item} quantity={q} />;
            })
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataObj: state.data,
  items: state.currentOrder.items,
});
export default connect(mapStateToProps)(ItemList);
