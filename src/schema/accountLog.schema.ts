import * as mongoose from 'mongoose';

const d = new Date();

export const AccountLogSchema = new mongoose.Schema({
    orderNum:{
        type:String,
    },
    mainCollectionNum:{
        type:String
    },
    app:{
        type:String,
    },
    transferInAmount:{          //转入金额
        type:Number
    },
    income:{
        type:Number,
    },
    accountingTiem:{
        type:Date,
        default:d.getTime()
    },
})