import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Pagination = styled.nav`
  & > a {
    &:not(:last-child) {
      margin-right: 0.5em;
    }
    &:not(:first-child) {
      margin-left: 0.5em;
    }
  }
`

const WrappedLink = ({ disabled = false, children, className, ...props }) => (
  <React.Fragment>
    {disabled ? (
      <Link
        onClick={disabled ? (e) => e.preventDefault() : null}
        className={`${className} btn--disabled`}
        {...props}
      >
        {children}
      </Link>
    ) : (
      <Link className={className} {...props}>
        {children}
      </Link>
    )}
  </React.Fragment>
)

const ListPagination = ({ numberOfPages, currentPage, path, blog = false }) =>
  numberOfPages > 1 ? (
    <footer className="list-pagination card u-block-xl">
      <header style={{ paddingTop: 0 }} className="list-pagination__header">
        <h3>Continue reading</h3>
      </header>
      <Pagination>
        {currentPage - 1 > 0 && (
          <Link
            rel="prev"
            to={
              currentPage - 1 === 1
                ? blog
                  ? "/"
                  : path
                : path + (currentPage - 1)
            }
            className="btn btn--sm btn--ghost"
          >
            ←&nbsp;Previous
          </Link>
        )}

        {Array.from({ length: numberOfPages }).map((el, index) => (
          <WrappedLink
            key={`page-${index}`}
            to={index === 0 ? (blog ? "/" : path) : path + (index + 1)}
            className="btn btn--sm btn--ghost"
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </WrappedLink>
        ))}

        {numberOfPages > currentPage && (
          <Link
            rel="next"
            to={path + (currentPage + 1)}
            className="btn btn--sm btn--ghost"
          >
            Next&nbsp;→
          </Link>
        )}
      </Pagination>
    </footer>
  ) : null

ListPagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
}

export default ListPagination
