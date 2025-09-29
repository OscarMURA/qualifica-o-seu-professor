// src/__tests__/server.test.ts

describe('entry: src/server.ts', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('calls connectDB and starts server with PORT from env', async () => {
    const mockConnectDB = jest.fn().mockResolvedValue(undefined);
    const mockListen = jest.fn((port: number, cb?: () => void) => cb && cb());
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    jest.resetModules();
    jest.doMock('dotenv', () => ({ config: jest.fn() }));
    jest.doMock('../app', () => ({ __esModule: true, default: { listen: mockListen } }));
    jest.doMock('../config/connectionDB', () => ({ connectDB: mockConnectDB }));

    process.env.PORT = '4321';
    const { startServer } = await import('../server');
    await startServer();

    expect(mockConnectDB).toHaveBeenCalled();
  expect(mockListen).toHaveBeenCalledWith(process.env.PORT, expect.any(Function));
  expect(consoleSpy).toHaveBeenCalledWith(`API up on :${process.env.PORT}`);

    consoleSpy.mockRestore();
  });

  it('defaults to 3000 when PORT not set', async () => {
    const mockConnectDB = jest.fn().mockResolvedValue(undefined);
    const mockListen = jest.fn((port: number, cb?: () => void) => cb && cb());
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    jest.resetModules();
    jest.doMock('dotenv', () => ({ config: jest.fn() }));
    jest.doMock('../app', () => ({ __esModule: true, default: { listen: mockListen } }));
    jest.doMock('../config/connectionDB', () => ({ connectDB: mockConnectDB }));

    delete process.env.PORT;
    const { startServer } = await import('../server');
    await startServer();

  expect(mockListen).toHaveBeenCalledWith(3000, expect.any(Function));
  expect(consoleSpy).toHaveBeenCalledWith('API up on :3000');

    consoleSpy.mockRestore();
  });
});
