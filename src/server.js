import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: { email, name },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(3001, () => {
  console.log("Webhook server running on port 3001");
});
