import * as mongoose from 'mongoose';

const d = new Date();

export const AccountLogSchema = new mongoose.Schema({
    orderNum:{
        type:Number,
    },
    mainCollectionNum:{
        type:Number
    },
    app:{
        type:Number,
    },
    transferInAmount:{          //转入金额
        type:Number
    },
    income:{
        type:Number,
    },
    AccountingTiem:{
        type:Number,
        default:d.getTime()
    },
})