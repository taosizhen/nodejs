import { Router } from "express";
import user from "./user";
import fileList from "./fileList";
import router from "./user";
const routes = Router();
routes.use('/user',user)
routes.use('/fileList', fileList)
export default routes