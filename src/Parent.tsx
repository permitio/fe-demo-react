import React from 'react';

// react parent component which has child component as parameter
const Parent = ({ children }: any) => {
  return <div>{children}</div>;

}


export default Parent;