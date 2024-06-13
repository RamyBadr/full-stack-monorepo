export type MockRepository = Record<string, jest.Mock>;

export function createMockRepository(): MockRepository {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn()
  };
}
