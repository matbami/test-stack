import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
// import config from '../config/config';
import {
  LoginInterface,
  UserInterface,
} from "../utils/interface/general.interface";
import { AppError } from "../helper/errorHandler";
import { generateToken } from "../helper/token";

export class UserService {
  private user: typeof User;
  constructor() {
    this.user = User;
  }

  async register(userDetails: UserInterface) {
    const { email, password, username } = userDetails;
    const existingUser = await this.user.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new AppError("email taken", 400);
    }

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    const user = await this.user.create({
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;

    const token = generateToken(user);

    return {
      user,
      token,
    };
  }

  async login(loginDetails: LoginInterface) {
    const { email, password } = loginDetails;
    const user = await this.user.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError("Invalid email or password", 401);
    }
    delete user.password;

    const token = generateToken(user);
    return {
      user,
      token,
    };
  }

  async getUserbyId(id: string){
    const user: User = await this.user.findByPk(id)
    if(!user){
        throw new AppError("User ", 401);
    }
    return user
  }
}
