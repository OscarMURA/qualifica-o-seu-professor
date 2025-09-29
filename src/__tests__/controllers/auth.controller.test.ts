import { Request, Response } from "express";
import { registerCtrl, loginCtrl } from "../../controllers/auth.controller";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


jest.mock("../../models/user.model");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const mockUserModel = UserModel as jest.Mocked<typeof UserModel>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;