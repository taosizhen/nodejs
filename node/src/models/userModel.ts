import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:'Enter a first name'
    },
    passward:{
        type:String,
        required:'Enter a email'
    },
    status:{
        type: String,
    },
    phone:{
        type:Number
    },
    created_date:{
        type:Date,
        default: Date.now
    }
})
const User = mongoose.model('user',userSchema)
export default User;