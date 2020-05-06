var express = require('express')
var router = express.Router()
import fileListController from "../controllers/fileListController";
import routes from ".";
/***
 * @route/user
 * get:获取所有用户
 * post: 创建用户
 */
router
    .route('/')
    .post(fileListController.fileUpdate)
router
    .route('/upload')
    .post(fileListController.upload_excel)
router
    .route('/list')
    .get(fileListController.listAll)   
router
    .route('/list/:id')
    .delete(fileListController.delFile)
export default router