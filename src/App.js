import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UniversityListContainer from "./view/UniversityListContainer";
import UniversityDetailsContainer from "./view/UniversityDetailsContainer";
import Header from "./components/Header/Header";
import "./App.css";
import UniversityController from "./controller/UniversityController";

const App = () => {
  // controller to manage the state of all universities, from fetching to sorting, deleting, caching and searching
  const {
    paginatedResult,
    handleSort,
    handleDelete,
    handleSearch,
    error,
    page,
    totalPages,
    isLoading,
    getUniversity,
    setPage,
  } = UniversityController();
  
  return (
    <Router>
      <Header handleSearch={handleSearch} />
      <div className="page-body">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <UniversityListContainer
                universities={paginatedResult}
                handleSort={handleSort}
                handleDelete={handleDelete}
                error={error}
                page={page}
                totalPages={totalPages}
                isLoading={isLoading}
                setPage={setPage}
              />
            }
          />
          <Route
            path="/details/:id"
            element={
              <UniversityDetailsContainer getUniversity={getUniversity} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
