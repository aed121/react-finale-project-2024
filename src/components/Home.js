import React, { useEffect, useState, useContext } from 'react';
import { fetchEmployees } from '../api';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addFavorite, favorites } = useContext(FavoritesContext);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const employees = await fetchEmployees();
        setEmployees(employees);
      } catch (error) {
        console.error(error.message);
      }
    };

    getEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    `${employee.name.first} ${employee.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Worker Directory</h1>
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="list-group">
        {filteredEmployees.map((employee, index) => (
          <li key={index} className="list-group-item">
            <div>
              <img src={employee.picture.thumbnail} alt={employee.name.first} />
              <p>{employee.name.first} {employee.name.last}</p>
              <p>Age: {employee.dob.age}</p>
              <p>Location: {employee.location.city}, {employee.location.country}</p>
              <Link to={`/employee/${index}`} className="btn btn-primary">More Details</Link>
              <button 
                onClick={() => addFavorite(employee)} 
                className="btn btn-secondary"
              >
                {favorites.find(fav => fav.login.uuid === employee.login.uuid) ? 'Unfavorite' : 'Add to Favorites'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
