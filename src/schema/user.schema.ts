import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userName:String,        //用户名
    userType:String,        //用户类型
    password:String,        //密码
    postage:String,         //资费
    mainCollection:String,  //主收款
    userStatus:String,      //用户状态
    weChat:String,          //微信

});