import React from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components';

const ChildrenDemo = () => (
  <>
    <p>
      <Math first={7} second={11} operator="+" />
    </p>
    <p>
      <Math first={7} second={3} operator="-" />
    </p>
    <p>
      <Math first={7} second={0} operator="/" />
    </p>
    <p>
      <Math first={7} second={5} operator="*" />
    </p>
    <p>
      <Math first={7} second={8} operator="^" />
    </p>
    <div>
      <Math first={4} second={3} operator="*">
        {
          ({ first, second, result }) => (
            <Typography component="h2" color="primary">
              {`When we multiply ${first} and ${second} then we will get ${result} as result`}
            </Typography>
          )
        }
      </Math>
      <Math first={9} second={8} operator="+">
        {
          ({ first, second, result }) => (
            <Typography component="h2" color="primary">
              {`When we add ${first} and ${second} then we will get ${result} as result`}
            </Typography>
          )
        }
      </Math>
    </div>
  </>
);
export default ChildrenDemo;
