import { Request,Response, NextFunction } from "express";
import User from '../models/userModel';
import HttpException from '../exceptions/HttpException'
import NotFoundException from '../exceptions/NotFoundException'
class UserController {
    static listAll = async(req:Request,res:Response)=>{
        console.log('list All')
        User.find({},(err:any,allInfo:any)=>{
            if (err) {
                res.send(err)
            }
            res.send(allInfo)
        })
    }
    static getOneById = async (req: Request, res: Response,  next: NextFunction)=>{
        console.log('get one by id')
        const id = req.params.id;
        User.findById(req.params.id,(err:any,userInfo:any)=>{ 
            // if (err) {
            //     next(new NotFoundException(id))
            // }
            res.send(userInfo)
        })
    }
    static newUser = async(req:Request,res:Response)=>{
        console.log('creat user', req.query)
        let newUser = new User(req.query);
        newUser.save((err: any, info: any)=>{
            if (err) {
               console.log(err)
            }
            res.send(info)
        })
    }
    static editUser = async (req:Request,res:Response)=>{
        console.log('edit user')
        User.findOneAndUpdate({ _id: req.params.id }, req.body, (err: any, info: any)=>{
            if (err) {
                res.send(err)
            }
            res.send(info)
        })

    }
    static delUser = async(req:Request,res:Response)=>{
        User.remove({ _id: req.params.id }, (err: any)=>{
            if (err) {
                res.send(err)
            }
            res.send({message:'successfuly deleted user'})
        })
        
    }
}
export default UserController;