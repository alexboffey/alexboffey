import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const ListPagination = ({ numberOfPages, currentPage, path }) =>
  numberOfPages > 1 ? (
    <React.Fragment>
      {currentPage - 1 > 0 && (
        <Link
          rel="prev"
          to={currentPage - 1 === 1 ? path : path + (currentPage - 1)}
        >
          Previous
        </Link>
      )}
      {numberOfPages > currentPage && (
        <Link rel="next" to={path + (currentPage + 1)}>
          Next
        </Link>
      )}
    </React.Fragment>
  ) : null;

ListPagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired
};

export default ListPagination;
