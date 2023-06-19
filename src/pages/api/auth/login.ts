import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { compareSync } from "bcrypt-ts";
import jwt from 'jsonwebtoken';  // npm install jsonwebtoken
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (!existingUser) {
            return res.status(400).json({ error: "Email does not exist" });
        }

        if (!compareSync(password, existingUser.password)) {
            return res.status(400).json({ error: "Password is incorrect" });
        }

        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, jwtSecret, {
            expiresIn: '1d',
        });

        return res.status(200).json({ token, user: {
            email: existingUser.email,
            name: existingUser.name,
        } });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
