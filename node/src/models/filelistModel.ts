import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const fileListSchema = new Schema({
    created_date: {
        type: Date,
        default: Date.now
    },
    glserial: {
        type: String
    },
    gqserial:{
        type: String
    },
    startserial:{
        type: String
    },
    startport:{
        type: String
    },
    endserial:{
        type: String
    },
    endport:{
        type: String
    }
})
const fileList = mongoose.model('fileList', fileListSchema)
export default fileList;