import bcrypt from "bcryptjs";
import { config } from "../config/config";
import { userRepository, UserInput } from "../models/user.model";
import { generateToken } from "../utils/jwt.utils";
import { User } from "../db/schema";

export class AuthService {
  async register(userData: UserInput): Promise<{
    user: Omit<User, "password">;
    token: string;
  }> {
    // check if user exist
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(
      userData.password,
      config.bcrypt.saltRounds
    );

    // create user
    const user = await userRepository.create({
      email: userData.email,
      password: hashedPassword,
      name: userData.name || null,
    });

    // create token
    const token = generateToken(user);

    // return user without password and token
    const { password, ...safeUser } = user;
    return { user: safeUser, token };
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    user: Omit<User, "password">;
    token: string;
  }> {
    // find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // gen token
    const token = generateToken(user);

    // return user without password and token
    const { password: _, ...safeUser } = user;
    return { user: safeUser, token };
  }
}

export const authService = new AuthService();
