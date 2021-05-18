import React from 'react';
import { useQuery, gql } from '@apollo/client';

const getBrandsQuery = gql`
  {
    brands {
      name
      c_origin
      id
    }
  }
`;

import React from 'react';

const AddCar = () => {
  return <div></div>;
};

export default AddCar;
