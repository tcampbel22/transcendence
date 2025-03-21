const request = require('supertest');
const Fastify = require('fastify');

describe('Health Check API', () => {
  let app;
  let server;

  beforeEach(async () => {
    app = Fastify();
    app.get('/health', async () => ({ status: 'ok' }));
    await app.ready(); // This prepares the server
    server = app.server; // Get the underlying HTTP server
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return 200 OK using inject', async () => {
    // Fastify's built-in testing (faster, good for unit tests)
    const res = await app.inject({
      method: 'GET',
      url: '/health'
    });
    
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).status).toBe('ok');
  });

  it('should return 200 OK using SuperTest', async () => {
    // SuperTest (good for more complex integration tests)
    const res = await request(server).get('/health');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
