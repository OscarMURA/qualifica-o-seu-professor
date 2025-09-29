import { z } from 'zod';
import { validate } from '../../middlewares/validate.middleware';

describe('validate.middleware', () => {
  test('returns 400 on schema errors and calls next on success', () => {
    const schema = z.object({ a: z.string() });
    const handler = validate(schema, 'body');
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    handler({ body: { a: 1 } } as any, res, next);
    expect(res.status).toHaveBeenCalledWith(400);

    handler({ body: { a: 'ok' } } as any, res, next);
    expect(next).toHaveBeenCalled();
  });
});
