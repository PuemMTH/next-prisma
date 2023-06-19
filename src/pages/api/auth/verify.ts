import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';  // npm install jsonwebtoken
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export default function verify(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        return res.status(200).json(decoded);
    } catch (error) {
        res.status(400).json({ error: 'Token is invalid' });
    }
}
