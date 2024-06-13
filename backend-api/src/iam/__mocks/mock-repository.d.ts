import { Model } from "mongoose";

export type MockRepository<T = any> = Partial<
  Record<keyof Model<T>, jest.Mock>
>;
export const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn()
});
