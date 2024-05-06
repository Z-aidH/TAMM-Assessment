import { useEffect, useMemo, useState } from "react";
import UniversityServices from "../services/UniversityServices";
import University from "../models/University";

function UniversityController() {
  // state management
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // fetch universities from the API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await UniversityServices.fetchUniversities();
        setUniversities(
          data.map(
            (item) =>
              new University({ id: hashDomainToId(item.domains[0]), ...item })
          )
        );
        localStorage.setItem("universities", JSON.stringify(data));
        setIsLoading(false);
      } catch (err) {
        const storedData = JSON.parse(localStorage.getItem("universities"));
        if (storedData) {
          setUniversities(
            storedData.map(
              (item) =>
                new University({ id: hashDomainToId(item.domains[0]), ...item })
            )
          );
        } else {
          setError("Failed to fetch data from the API");
        }
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term || "");
  };

  // search through all universities
  const searchedUniversities = useMemo(() => {
    if (!searchTerm) return universities;

    return universities.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.domains[0].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [universities, searchTerm]);

  //paginate the result
  const paginatedResult = useMemo(() => {
    if (!searchedUniversities.length) return [];
    const start = (page - 1) * 10;
    const end = start + 10;
    return searchedUniversities.slice(start, end);
  }, [searchedUniversities, page]);

  //handle sorting by name
  const handleSort = (dir) => {
    const sortedUniversities = [...universities].sort((a, b) =>
      dir === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setUniversities(sortedUniversities);
  };

  //handle delete entities
  const handleDelete = (id) => {
    const updatedUniversities = universities.filter((u) => u.id !== id);
    setUniversities(updatedUniversities);
    if (paginatedResult.length === 1 && page > 1) {
      setPage(page - 1);
    }
  };

  //get university by id (domain)
  const getUniversity = (id) => {
    const domain = decryptIdToDomain(id);
    return universities.find((u) => u.domains[0] === domain);
  };

  const totalPages = Math.ceil(searchedUniversities.length / 10);

  // reset page when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return {
    getUniversity,
    paginatedResult,
    setPage,
    page,
    error,
    isLoading,
    totalPages,
    searchTerm,
    searchedUniversities,
    universities,
    handleSearch,
    setUniversities,
    handleSort,
    handleDelete,
  };
}
export default UniversityController;

// encrypting and decrypting domain to id for a better url routing
function hashDomainToId(domain) {
  // Replace dots with underscores and convert to lowercase
  const normalized = domain.replace(/\./g, "_").toLowerCase();

  // Simulate reversible hashing (for demonstration purposes only)
  const hash = normalized.split("").reverse().join("");

  return hash;
}

function decryptIdToDomain(id) {
  // Simulate decryption of the hashed ID (reverse the process)
  if (typeof id !== "string") return id;
  const domain = id.split("").reverse().join("").replace(/_/g, ".");

  return domain;
}
