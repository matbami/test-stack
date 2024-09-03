import User from "../models/user.model";
import bcrypt from "bcryptjs";

import {
  LoginInterface,
  UserInterface,
} from "../utils/interface/general.interface";
import { AppError } from "../helper/errorHandler";
import { generateToken } from "../helper/generateToken";

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
      throw new AppError("Email is already taken", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.user.create({
      username,
      email,
      password: hashedPassword,
    });

    const userObject = user.toJSON();
    delete userObject.password;
    const token = generateToken(user);

    return {
      user: userObject,
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

    const userObject = user.toJSON();
    delete userObject.password;
    delete user.password;

    const token = generateToken(user);
    return {
      user: userObject,
      token,
    };
  }

  async getUserById(id: string) {
    const user: User = await this.user.findByPk(id);
    if (!user) {
      throw new AppError("User ", 401);
    }
    return user;
  }
}
