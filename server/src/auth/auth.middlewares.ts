import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import { secret } from "../config/Constants"
import { upload } from "../config/Upload";
import { UserValidation } from "./auth.validation";

export class AuthMiddleware {

  asyncErrorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

  isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    const authorization: string | undefined = req.headers["authorization"];
    if (!authorization) {
      return res.status(400).json({ err: "Not authenticated" })
    }
    try {
      const payload = jwt.verify(authorization, secret);
      res.locals.payload = payload
    } catch (err) {
      return res.json({ err })
    }

    return next();
  }

  uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
    await upload.any()(req, res, (err: any) => {
      const { files } = req;
      if (!files) {
        return res.status(400).json({ errorOnUpload: "The file failed to upload" })
      } else if (err) {
        return res.status(500).json({ error: err })
      }
      res.locals.files = files;
      return next()
    })
  }

  validateInputs = async (req: Request, res: Response, next: NextFunction) => {
    const userValidation = new UserValidation()
    const { path } = req.route
    const { validateLoginInput, validateRegisterInput } = userValidation
    console.log(path)
    if (path === "/login") {
      const { errors, isValid } = validateLoginInput(req.body)
      if (!isValid) {
        return res.status(400).json(errors)
      }
    } else if (path === "/register") {
      console.log(req.body)
      const { errors, isValid } = validateRegisterInput(req.body)
      if (!isValid) {
        return res.status(400).json(errors)
      }
    }
    return next();
  }
}