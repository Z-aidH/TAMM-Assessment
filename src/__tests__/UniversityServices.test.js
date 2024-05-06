import axios from "axios";
import UniversityServices from "../services/UniversityServices";

jest.mock("axios");

describe("UniversityServices", () => {
  test("should fetch universities successfully", async () => {
    const mockData = [{ name: "University 1" }, { name: "University 2" }];
    axios.get.mockResolvedValueOnce({ data: mockData });
    const universities = await UniversityServices.fetchUniversities();
    expect(universities).toEqual(mockData);
  });

  test("should handle error when fetching universities fails", async () => {
    axios.get.mockRejectedValueOnce(
      new Error("Failed to fetch universities data")
    );
    await expect(UniversityServices.fetchUniversities()).rejects.toThrow(
      "Failed to fetch universities data"
    );
  });
});
