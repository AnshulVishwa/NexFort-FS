import { model, Schema } from "mongoose";

const schema = new Schema({
    username : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

export const USER = new model("users" , schema)
