// src/__tests__/config/connectionDB.test.ts
import mongoose from 'mongoose';

// Ensure mongoose is mocked before importing the module under test
jest.mock('mongoose');

const mockMongoose = mongoose as jest.Mocked<typeof mongoose>;

describe('connectDB', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('calls mongoose.connect with MONGODB_URI when provided', async () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/testdb';

    jest.isolateModules(async () => {
      jest.doMock('mongoose', () => ({ connect: jest.fn().mockResolvedValue({}) }));
      const mongooseMock = await import('mongoose');
      const { connectDB } = await import('../../config/connectionDB');
      await connectDB();
      expect((mongooseMock as any).connect).toHaveBeenCalledWith(
        'mongodb://localhost:27017/testdb',
        expect.any(Object)
      );
    });
  });

  it('should throw error for invalid URI scheme', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
      throw new Error(`Process exit called with code ${code}`);
    });

    process.env.MONGODB_URI = 'invalid://localhost:27017/testdb';

    const { connectDB } = await import('../../config/connectionDB');
    
    try {
      await connectDB();
    } catch (error) {
      // Expected error from mocked process.exit
    }

    expect(consoleSpy).toHaveBeenCalledWith('Error connecting to MongoDB:', expect.any(Error));
    expect(mockExit).toHaveBeenCalledWith(1);

    consoleSpy.mockRestore();
    mockExit.mockRestore();
  });


});
