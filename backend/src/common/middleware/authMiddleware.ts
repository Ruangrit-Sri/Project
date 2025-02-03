import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // ตรวจสอบ Token ใน Header
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // ดึง Token (รูปแบบ: Bearer <token>)

    // ตรวจสอบ JWT
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" }); // Forbidden
      }

      // เก็บข้อมูลผู้ใช้ไว้ใน Request
      req.user = decoded; // เช่น { userId: '12345' }

      next(); // เรียก Middleware ถัดไป
    });
  } else {
    res.status(401).json({ message: "Authorization token missing" }); // Unauthorized
  }
};
