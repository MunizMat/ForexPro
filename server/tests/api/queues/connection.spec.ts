import connection from '../../../src/api/queues/connection';

describe('Redis Connection options', () => {
  it('should have expected properties', () => {
    expect(connection.host).toBeDefined();
    expect(connection.port).toBeDefined();
    expect(connection.maxRetriesPerRequest).toBeNull();
  });
});
