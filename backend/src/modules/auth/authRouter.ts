import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { authService } from "@modules/auth/authService";
import { LoginUserSchema } from "@modules/auth/authModel";
import { authenticateJWT } from "@common/middleware/authMiddleware";


export const authRouter = (() => {
    const router = express.Router();

   
    // CREATE a user
    router.post("/login", validateRequest(LoginUserSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const serviceResponse = await authService.login(payload, res);
        handleServiceResponse(serviceResponse, res);
    });

    // router.get("/protected", authenticateJWT, (req: Request, res: Response) => {
    //     res.json({ message: "This is a protected route", user: req.user });
    //   });

    // router.post('/login', async (req: Request, res: Response) => {
    //     const { username, password } = req.body;
      
    //     // ตรวจสอบผู้ใช้จากฐานข้อมูล (ใช้ Prisma)
    //     const user = await prisma.user.findUnique({ where: { username } });
    //     if (!user || user.password !== password) {
    //       return res.status(401).json({ message: 'Invalid credentials' });
    //     }
      
    //     const accessToken = generateAccessToken(user.user_id);
    //     const refreshToken = generateRefreshToken(user.user_id);
      
    //     // ตั้งค่า HTTP-Only Cookie
    //     res.cookie('refreshToken', refreshToken, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === 'production', // ใช้ HTTPS ใน production
    //       sameSite: 'strict',
    //     });
      
    //     res.json({ accessToken });
    //   });
      
        
    return router;

    
})();

// กำหนดเส้น Api 



