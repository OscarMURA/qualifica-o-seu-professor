import request from 'supertest';

describe('app routes', () => {
  test('GET / returns welcome message', async () => {
    const { default: app } = await import('../app');
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  test('GET /api/health returns ok', async () => {
    const { default: app } = await import('../app');
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  test('404 handler for unknown route', async () => {
    const { default: app } = await import('../app');
    const res = await request(app).get('/no-such-route');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Not Found');
  });

  test('error handler handles thrown errors (mounted before 404)', async () => {
    // Re-import app with a mocked routes module that contains a throwing route
    jest.resetModules();
    const express = await import('express');
    const router = express.Router();
    router.get('/err-route', () => { throw new Error('boom'); });
    // mock the routes module so app mounts this router at /api
    jest.doMock('../routes', () => router);
    const { default: appWithMock } = await import('../app');

  const res = await request(appWithMock).get('/api/err-route');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('message');
  });
});
