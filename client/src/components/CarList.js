import React from 'react';
import { useQuery, gql } from '@apollo/client';

const getCarsQuery = gql`
  {
    cars {
      name
      segment
      id
    }
  }
`;

const CarList = () => {
  const { loading, error, data } = useQuery(getCarsQuery);
  console.log(data);

  if (loading) return <div>LOADING....</div>;
  if (error) return <div>ERROR !!</div>;
  return (
    <div>
      <ul id='car-list'>
        {data.cars.map((car) => {
          return <li key={car.id}>{car.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default CarList;
