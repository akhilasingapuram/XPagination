import React, { useState, useEffect } from "react";

const EmployeeDataTable = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const API_EndPoint =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const fetchData = async () => {
    try {
      const data = await fetch(API_EndPoint);
      const jsonData = await data.json();
      setEmployeeList(jsonData);
    } catch (error) {
      alert("failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(employeeList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = employeeList.slice(startIndex, endIndex);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="employee">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="buttons">
        <button
          type="button"
          onClick={() => handlePageChange("prev")}
          // disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* <span>
          Page {currentPage} of {totalPages}
        </span> */}
        <div className="button">{currentPage}</div>
        <button
          type="button"
          onClick={() => handlePageChange("next")}
          // disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeDataTable;
