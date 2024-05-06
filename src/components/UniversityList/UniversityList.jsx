import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UniversityListStyles.css";


// UniversityList component
const UniversityList = ({ universities, onDelete, isLoading, onSort }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    onSort(sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);
  // Function to handle the delete action with timeout for the animation 
  const handleDelete = (id, row) => {
    row.classList.add("deleted-row");
    setTimeout(() => {
      onDelete(id);
    }, 500); // Adjust the duration to match the animation duration in CSS
  };
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th
              className={`sortable ${sortOrder}`}
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
            >
              Name
            </th>
            <th>Country</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="loading" colSpan="4"></td>
            </tr>
          ) : !universities?.length ? (
            <tr>
              <td className="no-data" colSpan="4">
                No universities found
              </td>
            </tr>
          ) : (
            universities.map((university) => (
              <tr key={university.id}>
                <td title={university.name}>
                  <Link to={`details/${university.id}`}>{university.name}</Link>
                </td>
                <td>{university.country}</td>
                <td>
                  <a
                    href={university.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {university.web_pages[0]}
                  </a>
                </td>
                <td>
                  <button
                    onClick={(e) =>
                      handleDelete(university.id, e.target.closest("tr"))
                    }
                  >
                    Delete
                  </button>
                  <div className="go-to-page-icon"></div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityList;
