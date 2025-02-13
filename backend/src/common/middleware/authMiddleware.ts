import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  // ตรวจสอบ Token ใน Header
  const token = req.cookies.token;
  
  if (token) {

    const decoded = verifyToken(token);
    if(!decoded){
      res.status(403).json({ message: "Invalid or expired token" }); // Forbidden
      return ;
    }
   
      // เก็บข้อมูลผู้ใช้ไว้ใน Request
      req.user = decoded; // เช่น { userId: '12345' }

      next(); // เรียก Middleware ถัดไป
    
  } else {
    res.status(401).json({ message: "Authorization token missing" }); // Unauthorized
  }
};
