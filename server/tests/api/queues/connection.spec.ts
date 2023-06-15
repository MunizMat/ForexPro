import connection from '../../../src/api/queues/connection';

describe('Redis Connection options', () => {
  it('should have expected properties', () => {
    const redisHosts = ['redis', '127.0.0.1'];
    expect(redisHosts.includes(connection.host)).toBe(true);
    expect(connection.port).toBe(6379);
    expect(connection.maxRetriesPerRequest).toBeNull();
  });
});
