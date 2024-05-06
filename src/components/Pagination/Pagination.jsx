import React from "react";
import "./PaginationStyles.css";

// pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <div
          key={i}
          className={`page${currentPage === i ? " active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </div>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className={currentPage === 1 ? "disabled" : ""}
        onClick={handlePrev}
      >
        &lt;
      </button>
      <div className="pages">{renderPages()}</div>
      <button
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
