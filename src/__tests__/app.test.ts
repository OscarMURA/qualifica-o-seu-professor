// src/__tests__/app.test.ts
import app from '../app';

describe('app export', () => {
  it('exports an express application instance (has use and listen)', () => {
    expect(app).toBeDefined();
    expect(typeof (app as any).use).toBe('function');
    expect(typeof (app as any).listen).toBe('function');
  });
});
