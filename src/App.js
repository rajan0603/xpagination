import './App.css';
import React, {useState, useEffect} from "react";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    .then((response) => response.json())
    .then((res) => setData(res))
    .catch((error) => alert("failed to fatching data: ", error))
  }, []);

  const indexOfLastPage = currentPage * 10;
  const indexOfFirstPage = indexOfLastPage - 10;

  const currentItem = data.slice(indexOfFirstPage,indexOfLastPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // console.log(data);
  return (
    <div  >
        <h1 className = "App" >Employee Data Table</h1>
        <table className = "center">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentItem.map((info) => (
              <tr>
                <td>{info.id}</td>
                <td>{info.name}</td>
                <td>{info.email}</td>
                <td>{info.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='btn'>
          <button onClick = {() => handlePageChange(currentPage-1)} disabled = {currentPage===1}>Previous</button>
          <button>{currentPage}</button>
          <button onClick = {() => handlePageChange(currentPage+1)} disabled = {currentPage === Math.ceil(data.length / 10)}>Next</button>
        </div>
        
    </div>
  );
}

export default App;
