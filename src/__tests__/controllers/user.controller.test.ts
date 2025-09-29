import { jest } from '@jest/globals';

beforeEach(() => jest.resetModules());

describe('User Controller', () => {
  test('myProfile - 404 when not found, 200 when found', async () => {
    const mockFindById: any = jest.fn((id: string) => {
      const sel: any = jest.fn();
      sel.mockResolvedValue(id === 'u1' ? { id: 'u1', name: 'A' } : null);
      return { select: sel };
    });
    jest.doMock('../../models/user.model', () => ({ UserModel: { findById: mockFindById } }));

    const { myProfile } = await import('../../controllers/user.controller');

    const res404: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await myProfile({ user: { sub: 'no' } } as any, res404 as any);
    expect(res404.status).toHaveBeenCalledWith(404);

    const resOk: any = { json: jest.fn() };
    await myProfile({ user: { sub: 'u1' } } as any, resOk as any);
    expect(resOk.json).toHaveBeenCalledWith({ id: 'u1', name: 'A' });
  });

  test('updateUser - returns 404 when missing, 400 on duplicate email, and success updates', async () => {
    const mockFindByIdAndUpdate: any = jest.fn((id: string) => {
      const sel: any = jest.fn();
      sel.mockResolvedValue(id === 'u2' ? { id: 'u2', name: 'New' } : null);
      return { select: sel };
    });

    // 404 scenario
  const mock404: any = jest.fn();
  mock404.mockResolvedValue(null);
  jest.doMock('../../models/user.model', () => ({ UserModel: { findByIdAndUpdate: mock404 } }));
  const { updateUser } = await import('../../controllers/user.controller');
    const res404: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await updateUser({ params: { id: 'x' }, body: {} } as any, res404 as any);
    expect(res404.status).toHaveBeenCalledWith(404);

    // simulate duplicate key error
    const mockFindByIdAndUpdate2: any = jest.fn().mockImplementation(() => { throw { code: 11000, keyPattern: { email: 1 } }; });
    jest.doMock('../../models/user.model', () => ({ UserModel: { findByIdAndUpdate: mockFindByIdAndUpdate2 } }));
    const { updateUser: updateUser2 } = await import('../../controllers/user.controller');
    const res400: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await updateUser2({ params: { id: 'y' }, body: { password: 'p' } } as any, res400 as any);
    expect(res400.status).toHaveBeenCalledWith(400);

    // success path
    jest.doMock('../../models/user.model', () => ({ UserModel: { findByIdAndUpdate: mockFindByIdAndUpdate } }));
    const { updateUser: updateUser3 } = await import('../../controllers/user.controller');
    const resOk: any = { json: jest.fn() };
    await updateUser3({ params: { id: 'u2' }, body: { name: 'New' } } as any, resOk as any);
    expect(resOk.json).toHaveBeenCalledWith({ id: 'u2', name: 'New' });
  });
});
