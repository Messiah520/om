import * as mongoose from 'mongoose';

//APPID转送记录
export const AppIdRecordSchema = new mongoose.Schema({

    appName: {
        type: String
    },
    APPCODE: {          
        type: String
    },
    num: {              //数量
        type: Number
    },
    targetAccount: {    //目标账户
        type: String
    },
    transferTime: {     //转送时间
        type: Date,
        default: Date.now
    },
    operator: {         //操作人
        type: String
    },

});