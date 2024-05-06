import React from "react";
import "./UniversityDetailsStyles.css";

// details component
const UniversityDetail = ({ university }) => {
  return (
    <div>
      <h1>University Details</h1>
      {university ? (
        <div className="university-details">
          <h2>{university.name}</h2>
          <div>
            <span>Country: </span>
            <span>{university.country}</span>
          </div>
          <div>
            <span>Web Page: </span>
            <a href={university.web_pages[0]}>{university.web_pages?.[0]}</a>
          </div>
          {university.state_province && (
            <div>
              <span>State/Province: </span>
              <span>{university.state_province}</span>
            </div>
          )}
        </div>
      ) : (
        <div>No university selected</div>
      )}
    </div>
  );
};

export default UniversityDetail;
