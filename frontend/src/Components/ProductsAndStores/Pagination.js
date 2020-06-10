import React from 'react';
import { Pagination } from '@material-ui/lab';

const PaginationComponent = ({ filter, setFilter, totalPages, isActive }) => {

  const handlePage = (_, value) => {
    const nextPage = value - 1;
    if (nextPage !== filter.page) {
      setFilter({ ...filter, page: nextPage });
    }
  }

  return (
    <div className="pagination-container">
      { isActive  && <Pagination onChange={handlePage} count={totalPages} page={filter.page + 1} /> }
    </div>
  );
}

export default PaginationComponent;