import { Router } from 'express'
import { AuthController } from "./auth.controllers"
import { AuthMiddleware } from './auth.middlewares';


export class UserRoutes{
    public router: Router;
    private authController: AuthController = new AuthController();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();
    
    constructor(){
        this.router = Router();
        this.routes();
    }
    
    routes(){
        const { isLoggedIn, validateInputs, uploadFiles, asyncErrorHandler } = this.authMiddleware;
        const { Login, Register, Upload, getUserDetails } = this.authController;
        
        this.router.post("/login", validateInputs, asyncErrorHandler(Login));
        this.router.post("/register", validateInputs, asyncErrorHandler(Register));
        this.router.post("/upload", isLoggedIn, uploadFiles, Upload)
        this.router.get("/user-details", isLoggedIn, getUserDetails)
    }
}