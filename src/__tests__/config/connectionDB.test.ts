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
});
