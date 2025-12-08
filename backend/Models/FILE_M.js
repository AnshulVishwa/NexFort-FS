import { model, Schema } from "mongoose";

const schema = new Schema({
    username : {
        type : String,
        required : true
    },
    sentTo : {
        type : Number,
        required : true
    },
    file_name : {
        type : String,
        required : true
    },
    downloded : {
        type : Boolean,
        required:true
    },
})

export const FILE_M = new model("file" , schema)
