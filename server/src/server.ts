import express, { Application, Request, Response, NextFunction } from "express";
import mongoose, { connection } from "mongoose"
import cookieParser from "cookie-parser";
import cors from "cors";

import { UserRoutes } from "./auth/auth.routes";
// import { PostingRoutes } from "./posting/posting.routes"
import path from "path";
import { MONGODB_URI } from "./config/Constants";


function loggerMiddleware(request: Request, _response: Response, next: NextFunction) {
    console.log(new Date().toLocaleString() + '\x1b[36m', `${request.method} ${request.path}`, '\x1b[0m');
    next();
}

class Server {
    private app: Application;
    //@ts-ignore
    private port: number = process.env.PORT || 5001;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.moongo();
    }

    private config(): void {
        this.app.set("port", this.port);
        this.app.use(express.static(path.join(__dirname, '../../client', 'build')));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(loggerMiddleware)
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    private routes(): void {
        this.app.use("/api/auth", new UserRoutes().router);
        // this.app.use("/api/posting", new PostingRoutes().router);
        // if (process.env.NODE_ENV === 'production') {
        this.app.get('*', (_req: Request, res: Response) => res.sendFile(path.join(__dirname, '../../client', 'build/index.html')));
        // }
    }

    private moongo(): void {
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to reconnect to Mongo ...");
            setTimeout(() => {
                mongoose.connect(MONGODB_URI, {
                    autoReconnect: true, keepAlive: true,
                    socketTimeoutMS: 3000, connectTimeoutMS: 3000
                });
            }, 3000);
        });
        connection.on("close", () => {
            console.log("Mongo Connection Closed");
        });
        connection.on("error", (error: Error) => {
            console.log("Mongo Connection ERROR: " + error);
        });
        const run = async () => {
            await mongoose.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
        };
        try {
            run();
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }
    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("API is running at http://localhost:%d", this.app.get("port"));
        });
    }
}

const server = new Server();

server.start();