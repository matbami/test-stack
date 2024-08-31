import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';




export class AuthController{

    constructor(
        private userService: UserService
    ){

    }

    async register(req: Request, res: Response, next:NextFunction) {
        try {
            const user = await this.userService.register(req.body)
            return res.json(user)
        } catch (error) {
            next(error)
        }
      }

      async login(req: Request, res: Response, next:NextFunction) {
        try {
            const user = await this.userService.login(req.body)
            return res.json(user)
        } catch (error) {
            next(error)
        }
      }
  
    
}