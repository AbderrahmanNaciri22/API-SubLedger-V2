import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../../app.js";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/login", () => {
  it("should return 200", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
  });
});
