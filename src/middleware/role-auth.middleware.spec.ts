import { RoleAuthMiddleware } from './role-auth.middleware';

describe('RoleAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new RoleAuthMiddleware()).toBeDefined();
  });
});
