var express = require('express')
var router = express.Router()
import UserController from "../controllers/userController";
/***
 * @route/user
 * get:获取所有用户
 * post: 创建用户
 */
router
    .route('/')
    .get(UserController.listAll)
    
router
    .route('/userAdd')
    .get(UserController.newUser)
/**
 * @route /user/:id
 * get: 通过id 获取用户
 * put: 编辑用户
 * delete: 删除用户
 */
router
    .route('/:id')
    .get(UserController.getOneById)
    .put(UserController.editUser)
    .delete(UserController.delUser)

export default router