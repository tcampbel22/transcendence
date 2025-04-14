import axios from 'axios';
import https from 'https';

describe('Full system E2E test', () => {
  const baseURL = 'https://localhost:4433'; // Or whatever your Fastify server runs on

  // Create an HTTPS agent that ignores self-signed certificates
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Disable SSL verification
  });

  beforeAll(async () => {
    // optionally, use a script or shell command to run make/docker-compose here
    // or do it manually before running the test
  });

  it('should respond with 200', async () => {
    try {
      const res = await axios.get(`${baseURL}`, { httpsAgent });
      expect(res.status).toBe(200);
    } catch (error) {
      console.error('Error connecting to the server:', error.message);
      throw error;
    }
  });
});
