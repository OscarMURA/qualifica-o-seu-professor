import { UserModel, IUser } from "../../models/user.model";
import bcrypt from "bcrypt";

// Mock bcrypt
jest.mock("bcrypt");
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;