import React from 'react';
import './style.css';

const ItemProfile = () => {
  return (
    <div className="profile-container">
      <h1>Simple Burger</h1>
      <h3>50</h3>
      <h2>Burger</h2>
      <div>
        <button className="profile-btn">Delete</button>
        <button className="profile-btn">Edit</button>
      </div>
    </div>
  );
};

export default ItemProfile;
