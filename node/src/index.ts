import express from 'express'
var mongoose = require('mongoose');
import { json,urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from './models/errorMiddleware'
import { Router } from "express";
import routes from "./router";
class App {
    public app:express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.app.use(routes)        
        this.setMongoConfig()
        //错误处理
        this.initializeErrorHandling();
        this.app.get('/', function (req: any, res: { send: (arg0: any) => void; }) {
            res.send('hello world!');
        });
    }
    private config() {
        //开启cors
        this.app.use(cors())
        //支持application/json 类型发送数据
        this.app.use(urlencoded({extended:false}))
        //中间件日志
        this.app.use(morgan('dev'))
    }
    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }
    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/nodedb',{
            useNewUrlParser:true
        });
        mongoose.connection.on('error', (err:any) => {
            console.log(`数据库连接失败${err}`);
        });
        mongoose.connection.on('open', () => {
            console.log('数据库连接成功');
        });
    }
}
export  default new App().app