'use client';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div data-testid="loader" className="flex justify-center items-center">
      <Spinner
        style={{ width: '7rem', height: '7rem' }}
        animation="border"
        role="status"
        variant="primary"
        className="loader"
      ></Spinner>
    </div>
  );
};

export default Loader;
