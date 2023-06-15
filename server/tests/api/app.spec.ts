import App from '../../src/api/app';
import express from 'express';

jest.mock('express', () => jest.fn().mockReturnValue({ use: jest.fn() }));

describe('Express app', () => {
  it('should create an express application');
});
