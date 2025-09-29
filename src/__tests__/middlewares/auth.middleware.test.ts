import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { requireAuth } from "../../middlewares/auth.middleware";

// Mock jwt
jest.mock("jsonwebtoken");
const mockJwt = jwt as jest.Mocked<typeof jwt>;