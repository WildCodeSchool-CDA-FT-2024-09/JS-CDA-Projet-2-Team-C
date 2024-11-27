import React from 'react';

type propsType = {
  test: string;
};

function Test({ test }: propsType) {
  return (
    <>
      <h1>{test}</h1>
    </>
  );
}

export default Test;
