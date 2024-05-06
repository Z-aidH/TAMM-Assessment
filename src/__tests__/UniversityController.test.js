import { renderHook } from "@testing-library/react";
import UniversityController from "../controller/UniversityController";
import { act } from "react";

global.fetch = jest.fn();

describe("UniversityController", () => {
  // Test initial state
  test("should have initial state", () => {
    const { result } = renderHook(() => UniversityController());

    expect(result.current.paginatedResult).toEqual([undefined]);
    expect(result.current.searchTerm).toEqual("");
    expect(result.current.error).toBe("");
    expect(result.current.page).toBe(1);
    expect(result.current.isLoading).toBe(true);
  });

  // Test search term state
  test("should update search term", () => {
    const { result } = renderHook(() => UniversityController());

    act(() => {
      result.current.searchTerm = "test";
    });
    // Verify searchTerm state after handleSearch
    expect(result.current.searchTerm).toEqual("test");
  });

  // Test searchedUniversities function
  test("should filter universities based on search term", () => {
    const { result } = renderHook(() => UniversityController());

    const testUniversities = [
      { name: "Test University", domains: ["test.com"] },
      { name: "Not University", domains: ["Not.com"] },
    ];
    act(() => {
      result.current.setUniversities(testUniversities);
      result.current.handleSearch("test");
    });

    const filtered = result.current.searchedUniversities;

    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe("Test University");
  });

  // Test paginatedResult function
  test("should return paginated result based on page number", () => {
    const { result } = renderHook(() => UniversityController());
    act(() => {
      result.current.setUniversities(
        Array.from({ length: 20 }, (_, index) => ({
          id: index + 1,
          name: `University ${index + 1}`,
        }))
      );
      result.current.setPage(2);
    });

    const paginated = result.current.paginatedResult;
    expect(paginated.length).toBe(10);
    expect(paginated[0].id).toBe(11);
  });

  // Test handleSort function
  test("should sort universities by name", () => {
    const { result } = renderHook(() => UniversityController());
    const testUniversities = [
      { id: 1, name: "B University" },
      { id: 2, name: "A University" },
    ];

    act(() => {
      result.current.setUniversities(testUniversities);
    });
    act(() => {
      result.current.handleSort("asc");
    });
    expect(result.current.universities[0].name).toBe("A University");
  });

  // Test handleDelete function
  test("should delete university from the list", () => {
    const { result } = renderHook(() => UniversityController());
    const testUniversities = [
      { id: 1, name: "University 1" },
      { id: 2, name: "University 2" },
    ];
    act(() => {
      result.current.setUniversities(testUniversities);
    });
    act(() => {
      result.current.handleDelete(1);
    });
    expect(result.current.universities.length).toBe(1);
    expect(result.current.universities[0].id).toBe(2);
  });

  // Test getUniversity function
  test("should get university by ID", () => {
    const { result } = renderHook(() => UniversityController());

    const testUniversities = [
      { domains: [1], name: "University 1" },
      { domains: [2], name: "University 2" },
    ];
    let foundUniversity;
    act(() => {
      result.current.setUniversities(testUniversities);
    });
    act(() => {
      foundUniversity = result.current.getUniversity(1);
    });

    expect(foundUniversity.name).toBe("University 1");
  });

  // Test totalPages calculation
  test("should calculate total pages based on search results", () => {
    const { result } = renderHook(() => UniversityController());

    act(() => {
      result.current.setUniversities(
        Array.from({ length: 35 }, (_, index) => ({
          id: index + 1,
          name: `University ${index + 1}`,
        }))
      );
    });

    const totalPages = result.current.totalPages;

    expect(totalPages).toBe(4);
  });
});
