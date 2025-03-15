import { z } from "zod";
import { db } from "../db";
import { users, User, NewUser } from "../db/schema";
import { eq } from "drizzle-orm";

// user schema validation
export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).optional(),
});

export type UserInput = z.infer<typeof UserSchema>;

// for responses (we don't return a password - because that would be kinda stupid...)
export type SafeUser = Omit<User, "password">;

export class UserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result[0];
  }

  async create(userData: NewUser): Promise<User> {
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  }

  async findById(id: number): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0];
  }
}

export const userRepository = new UserRepository();
