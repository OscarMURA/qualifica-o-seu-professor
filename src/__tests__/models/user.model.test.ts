import { UserModel, IUser } from "../../models/user.model";
import bcrypt from "bcrypt";

// Mock bcrypt
jest.mock("bcrypt");
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe("User Model - Basic Tests", () => {
  it("should create user with valid data", () => {
    // Arrange
    const userData = {
      name: "Test User",
      email: "test@example.com",
      passwordHash: "hashedPassword123",
      role: "user" as const
    };

    // Act & Assert
    expect(() => new UserModel(userData)).not.toThrow();
  });

  it("should compare passwords correctly", async () => {
    // Arrange
    const user = new UserModel({
      name: "Test User",
      email: "test@example.com", 
      passwordHash: "hashedPassword123",
      role: "user"
    });

    mockBcrypt.compare.mockResolvedValue(true as never);

    // Act
    const result = await user.comparePassword("plainPassword");

    // Assert
    expect(mockBcrypt.compare).toHaveBeenCalledWith("plainPassword", "hashedPassword123");
    expect(result).toBe(true);
  });

  it("should return false for wrong password", async () => {
    // Arrange
    const user = new UserModel({
      name: "Test User",
      email: "test@example.com",
      passwordHash: "hashedPassword123", 
      role: "user"
    });

    mockBcrypt.compare.mockResolvedValue(false as never);

    // Act
    const result = await user.comparePassword("wrongPassword");

    // Assert
    expect(result).toBe(false);
  });
});