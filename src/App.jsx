import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [users, setUsers] = useState([]);
  const [tableUsers, setTableUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setTableUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);
  
  const handleSearch = e => {
    setSearch(e.target.value);
    filterUsers(e.target.value);
  } 

  const filterUsers = (terminoBusqueda) => {
    var result = tableUsers.filter((elemento) => {
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
      ){
        return elemento;
    }
  });
  setUsers(result);
}

  return (
    <>
      <div className="App">
        <div className="containerInput">
          <input className="form-control inputBUscar"
            value={search}
            placeholder="Search by name or company"
            onChange={handleSearch}
          />
          <button className="btn btn-succes">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-sm table-bordered">
            <thead>
                <tr>
                  <th>ID</th>
                  <th>name</th>
                  <th>tel</th>
                  <th>username</th>
                  <th>email</th>
                  <th>web site</th>
                  <th>city</th>
                  <th>company</th>
                </tr>
            </thead>

            <tbody>
              {users && users.map((user) => (
                <tr key={users.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.website}</td>
                  <td>{user.address.city}</td>
                  <td>{user.company.name}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}

export default App;
