import type { UserService } from "../services/UserService.js";
import type { Request, Response } from "express";

export class userController{
    constructor(
        private userService: UserService
    ){}

    async register(req: Request, res: Response): Promise<void>{
        try {
            const data = req.body;
            const user = await this.userService.registerUser(data);
            if(!user){
                res.status(400).json({message: 'Registration failed'})
            }
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message: 'Internal error', error: (error instanceof Error? error.message: String(error))});
        }
    }

    async login(req: Request, res: Response): Promise<void>{
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await this.userService.login(email, password);

            if(!user){
                res.status(400).json({message: 'Login failed'})
            }

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message: 'Internal error', error: (error instanceof Error? error.message: String(error))});
        }
    }
}