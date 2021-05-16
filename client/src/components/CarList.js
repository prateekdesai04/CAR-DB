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
  console.log(loading);
  console.log(error);

  return (
    <div>
      <ul id='car-list'>
        <li>Car Name</li>
      </ul>
    </div>
  );
};

export default CarList;
