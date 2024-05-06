import React from "react";
import UniversityList from "../components/UniversityList/UniversityList";
import Pagination from "../components/Pagination/Pagination";


// listing all universities with pagination
const UniversityListContainer = ({
  error,
  handleDelete,
  handleSort,
  page,
  setPage,
  totalPages,
  universities,
  isLoading,
}) => {
  return error ? (
    <div>{error}</div>
  ) : (
    <>
      <UniversityList
        universities={universities}
        onSort={handleSort}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
      {!!universities.length && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default UniversityListContainer;
