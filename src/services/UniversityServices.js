import axios from "axios";

const url = process.env.REACT_APP_UAE_UNIVERSITIES;
async function fetchUniversities() {
  try {
    // to change it to get the URL from .env
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch universities data");
  }
}

const UniversityServices = { fetchUniversities };

export default UniversityServices;
