import { useEffect, useState, useMemo } from "react";

const ListComponent = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setUsersData(result.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get the current items per page
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return usersData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, usersData]);

  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination
  const pageNumbers = useMemo(() => {
    const totalPages = Math.ceil(usersData.length / itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [usersData.length, itemsPerPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>List Component</h1>
      <ul style={{ listStyle: "none" }}>
        {currentItems.map(({ id, firstName }) => (
          <li key={id}>{firstName}</li>
        ))}
      </ul>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <ListComponent />
    </div>
  );
}
