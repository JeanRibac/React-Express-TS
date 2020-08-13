import { hash, genSalt, hashSync } from 'bcryptjs';
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { UserInterface, User } from './auth.model';
import { secret } from '../config/Constants';


interface I_SinInBody {
    email: string,
    password: string
}
interface I_SignUpBody extends I_SinInBody {
}

export class AuthController {
    async Register(req: Request, res: Response): Promise<Response> {
        const { email, password }: I_SignUpBody = req.body;
        const foundUser: UserInterface | null = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ error: 'Email already exists' })
        }
        const salt = await genSalt(15);
        const newPassword = await hash(password, salt);
        const newUser = new User({ email, password: newPassword, salt })
        try {
            let result = await newUser.save();
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }

    }

    async Login(req: Request, res: Response): Promise<Response> {
        const { email, password }: I_SinInBody = req.body;
        const foundUser = await User.findOne({ email })

        if (!foundUser) {
            return res.status(400).json({ error: "Invalid credentials!" })
        }

        const salt = foundUser.salt;
        const hash = hashSync(password, salt);
        const isMatch = hash === foundUser.password;
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials!" })
        }
        const userEmail = foundUser.email
        const payload = { email: userEmail };
        const accessToken = jwt.sign(payload, secret, { expiresIn: "1h" });

        res.header("Authorization", accessToken);
        return res
            .cookie("token", accessToken, { maxAge: 3600000 })
            .json({ success: true, token: accessToken })
    }

    async Upload(_req: Request, res: Response) {
        res.json({ success: true, files: res.locals.files })
    }

    async getUserDetails(_req: Request, res: Response): Promise<Response> {
        if (res.locals.payload) {
            const { email } = res.locals.payload;
            const foundUser = await User.findOne({ email })
            if (foundUser) {
                return res.json({ email: foundUser.email, postings: "to be added" })
            } else {
                return res.status(400).json({ err: "User not found" })
            }
        }
        return res.status(400).json({ err: "User not found" })
    }
}
