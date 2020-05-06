import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { text } from "body-parser";
import { networkInterfaces } from "os";
const parse = require('csv-parse')
const moment = require('moment')
let formidable = require('formidable');
let sd = require('silly-datetime');
const xlsx = require('xlsx')
const multer = require('multer')
import Filelist from '../models/filelistModel';
class flieListController {
    static fileUpdate = async (req: Request, res: Response, next: NextFunction) => {
        let AVATAR_UPLOAD_FOLDER = '/avatar';
        //创建上传表单
        var form = new formidable.IncomingForm();
        //设置编码格式
        form.encoding = 'utf-8';
        //设置上传目录
        form.uploadDir = '../public' + AVATAR_UPLOAD_FOLDER;
        //保留后缀
        form.keepExtensions = true;
        //文件大小
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, function (err: any, fields: any, files: any) {
            let filesFile = files.file
            if (err) {
                return res.json({
                    status: 500,
                    msg: "内部服务器错误",
                    result: ''
                })
            }
            // 限制文件大小 单位默认字节 这里限制大小为2m
            if (filesFile.size > form.maxFieldsSize) {
                fs.unlink(filesFile.path, () => { })
                return res.json({
                    status: '1',
                    msg: "图片大小不能超过2M",
                    result: ''
                })
            }
            //后缀名
            var extName = '';
            switch (filesFile.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }
            if (extName.length == 0) {
                return res.json({
                    status: '1',
                    msg: "只支持png和jpg格式图片",
                    result: ''
                })
            }
            //使用第三方模块silly-datetime
            var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
            //生成随机数
            // 生成新图片名称
            var avatarName = t + '_' + JSON.stringify(Math.random()) + '.' + extName;
            // 新图片路径
            var newPath = form.uploadDir + '/' + avatarName;
            // 更改名字和路径
            fs.rename(filesFile.path, newPath, function (err) {
                if (err) {
                    return res.json({
                        "code": 401,
                        "message": "图片上传失败"
                    })
                } else {
                    return res.json({
                        status: "0",
                        msg: "图片上传成功",
                        result: {
                            data: AVATAR_UPLOAD_FOLDER + '/' + avatarName
                        }
                    })
                }
            })
        })
    }
    static upload_excel = async (req: Request, res: Response) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err: any, fields: any, files: any) {
            let filesFile = files.file
            if (!filesFile || filesFile.length == 0) {
                return res.json({ text: '请上传文件' })
            }
            console.log(filesFile.name.indexOf('xls'))
            if (filesFile.name.indexOf('xls') == -1) {
                return res.json({ text: '请上传xls或者xlsx' })
            }

            const workbook = xlsx.readFile(files.file.path)
            let columnData:any = []
            let data:any = []
            workbook.SheetNames.forEach((sheetName: any) => {
                const csvdata = xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName])
                parse(csvdata, (err: any, output: any) => {

                    if (output && output.length > 0) {
                        columnData = output[0]
                        for (let j = 1; j < output.length; j++) {
                            for (let i = 0; i < output[j].length; i++) {
                                let Filelistible = new Filelist({ glserial: output[j][0], gqserial: output[j][1], startserial: output[j][2], startport: output[j][3], endserial: output[j][4], endport: output[j][5] })
                                Filelistible.save((err: any, info: any) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    res.send(info)
                                })                               
                            }
                        }
                         
                    }
                })
                
            });
            // const sheet = workbook.Sheets[workbook.SheetNames[0]]
            // const result = xlsx.utils.sheet_to_json(sheet)
            // let array = new Array
            // return res.json(result)
        })

    }
    static listAll = async (req: Request, res: Response) => {
        Filelist.find({}, (err: any, allInfo: any) => {
            if (err) {
                res.send(err)
            }
            allInfo.forEach((element: any) => {
                element.created_date = moment(new Date(parseInt(element.created_date, 10))).format('YYYY-MM-DD')
                console.log(89, element.created_date)
            });
            res.send(allInfo)
        })
    }
    static delFile = async (req: Request, res: Response) => {
        console.log(33, req.params)
        Filelist.remove({ _id: req.params.id }, (err: any) => {
            if (err) {
                res.send(err)
            }
            res.send({ message: 'successfuly deleted user' })
        })

    }

}
export default flieListController;