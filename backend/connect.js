import { connect } from "mongoose";

export default function ConnectMongoDB( url , dbName ){
    connect(url + dbName)
    .then( console.log("MongoDB connected") )
    .catch( (err) => console.log(err) )
}