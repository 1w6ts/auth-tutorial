export const config = {
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: "1h",
  },
  bcrypt: {
    saltRounds: 12,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
};
