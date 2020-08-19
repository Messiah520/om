import { ManagerAuthMiddleware } from './manager-auth.middleware';

describe('ManagerAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new ManagerAuthMiddleware()).toBeDefined();
  });
});
