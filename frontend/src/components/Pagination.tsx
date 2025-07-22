import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="blog-list__pagination">
      <ul className="pg-pagination list-unstyled">
        <li className={`prev${currentPage === 1 ? ' disabled' : ''}`}>
          <a href="#" aria-label="prev" onClick={(e) => handlePageClick(e, currentPage - 1)}>
            <i className="fas fa-arrow-left"></i>
          </a>
        </li>
        {[...Array(totalPages)].map((_, idx) => (
          <li key={idx + 1} className={`count${currentPage === idx + 1 ? ' active' : ''}`}>
            <a href="#" onClick={(e) => handlePageClick(e, idx + 1)}>
              {idx + 1}
            </a>
          </li>
        ))}
        <li className={`next${currentPage === totalPages ? ' disabled' : ''}`}>
          <a href="#" aria-label="next" onClick={(e) => handlePageClick(e, currentPage + 1)}>
            <i className="fas fa-arrow-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;