import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmployees } from '../api';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
});

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const employees = await fetchEmployees();
        setEmployee(employees[id]);
      } catch (error) {
        console.error(error.message);
      }
    };

    getEmployee();
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{employee.name.first} {employee.name.last}</h1>
      <img src={employee.picture.large} alt={`${employee.name.first} ${employee.name.last}`} />
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Location: {employee.location.street.name}, {employee.location.city}, {employee.location.state}, {employee.location.country}</p>
      <MapContainer 
        center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} 
        zoom={13} 
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} 
        />
      </MapContainer>
    </div>
  );
};

export default EmployeeDetails;
