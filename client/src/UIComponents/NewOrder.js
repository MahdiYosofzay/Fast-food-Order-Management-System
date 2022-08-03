import React, { useEffect } from "react";
import ItemList from "./ItemList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const NewOrder = ({ match, categories }) => {
  let category = "";
  if (match.params.category) category = match.params.category;

  return (
    <div className="container">
      <div className="sidebar">
        <h3>Filter</h3>
        <Link to="/new-order">All</Link>
        {categories ? (
          categories?.map((cat) => (
            <Link key={cat._id} to={`/new-order/${cat.name}`}>
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </Link>
          ))
        ) : (
          <CircularProgress />
        )}
      </div>
      <ItemList category={category} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps)(NewOrder);
