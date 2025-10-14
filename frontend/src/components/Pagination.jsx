import React from "react";
const Pagination = ({ page, onPrev, onNext, hasNext }) => (
  <div className="pagination">
    <button onClick={onPrev} disabled={page === 1}>← Prev</button>
    <span>Page {page}</span>
    <button onClick={onNext} disabled={!hasNext}>Next →</button>
  </div>
);
export default Pagination;