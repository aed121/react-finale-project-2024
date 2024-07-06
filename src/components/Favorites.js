import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favorites</h1>
      <ul className="list-group">
        {favorites.map((employee, index) => (
          <li key={index} className="list-group-item">
            <div>
              <img src={employee.picture.thumbnail} alt={employee.name.first} />
              <p>{employee.name.first} {employee.name.last}</p>
              <Link to={`/employee/${index}`} className="btn btn-primary">More Details</Link>
              <button 
                onClick={() => removeFavorite(employee)} 
                className="btn btn-danger"
              >
                Remove from Favorites
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
