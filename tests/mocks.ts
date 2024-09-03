import { Request, Response, NextFunction } from 'express';

export const mockRequest = () => ({
  body: {},
  params: {},
  query: {},
  user: {}
}) as unknown as Request;

export const mockResponse = () => {
  const res = {} as Response;
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = () => jest.fn() as NextFunction;
