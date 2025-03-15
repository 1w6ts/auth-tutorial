import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../db/schema";

export type JwtPayload = {
  id: number;
  email: string;
  name?: string | null;
};

export function generateToken(user: User): string {
  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: 3600,
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, config.jwt.secret) as JwtPayload;
  } catch (error) {
    return null;
  }
}
