import { renderHook } from "@testing-library/react";
import { act } from "react";
import UniversityController from "../controller/UniversityController";

global.fetch = jest.fn();

describe("UniversityController", () => {
  // Test initial state
  test("should have initial state", () => {
    const { result } = renderHook(() => UniversityController());
    const controller = result.current;

    expect(controller.universities).toEqual(undefined);
    expect(controller.searchTerm).toEqual(undefined);
    expect(controller.error).toBe("");
    expect(controller.page).toBe(1);
    expect(controller.isLoading).toBe(true);
  });

  // Test searchedUniversities function
  test("should filter universities based on search term", () => {
    const { result } = renderHook(() => UniversityController());
    const controller = result.current;
    const testUniversities = [
      { name: "Test University", domains: ["test.com"] },
      { name: "Not University", domains: ["Not.com"] },
    ];
    act(() => {
      controller.universities = testUniversities;
      controller.handleSearch("test");
    });
    const filtered = controller.searchedUniversities;
    console.log({ filtered, st: controller.searchTerm });
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe("Test University");
  });

  // Test paginatedResult function
  test("should return paginated result based on page number", () => {
    const { result } = renderHook(() => UniversityController());
    const controller = result.current;
    controller.universities = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `University ${index + 1}`,
    }));
    controller.page = 2;
    const paginated = controller.paginatedResult;
    expect(paginated.length).toBe(10);
    expect(paginated[0].id).toBe(1);
  });

  // Test handleSort function
  test("should sort universities by name", () => {
    const { result } = renderHook(() => UniversityController());
    const controller = result.current;
    const testUniversities = [
      { id: 1, name: "B University" },
      { id: 2, name: "A University" },
    ];
    act(() => {
      controller.universities = testUniversities;
      controller.handleSort("asc");
    });
    expect(controller.universities[0].name).toBe("A University");
  });

  // Test handleDelete function
  test("should delete university from the list", () => {
    const { result } = renderHook(() => UniversityController());
    const controller = result.current;
    controller.universities = [
      { id: 1, name: "University 1" },
      { id: 2, name: "University 2" },
    ];
    act(() => {
      controller.handleDelete(1);
    });
    expect(controller.universities.length).toBe(1);
    expect(controller.universities[0].id).toBe(2);
  });

  // Test getUniversity function
  test("should get university by ID", () => {
    const { result } = renderHook(() => UniversityController());
    const controller = result.current;
    const testUniversities = [
      { id: 1, name: "University 1" },
      { id: 2, name: "University 2" },
    ];
    controller.universities = testUniversities;
    const university = controller.getUniversity(2);
    expect(university.name).toBe("University 2");
  });

  // Test totalPages calculation
  test("should calculate total pages based on search results", () => {
    const { result } = renderHook(() => UniversityController());
    const controller = result.current;

    controller.universities = Array.from({ length: 35 }, (_, index) => ({
      id: index + 1,
      name: `University ${index + 1}`,
    }));
    const totalPages = controller.totalPages;

    expect(totalPages).toBe(4);
  });
});
