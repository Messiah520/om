import * as mongoose from 'mongoose';

export const MainCollectionSchema = new mongoose.Schema({
    userNum:{               //账户(注意运维平台的超级管理员也可能用主收款账号)
        type:String,
        default: ''
    },             
    mainCollectionNum:{       //主收款
        type:String,
        default: ''
    },      
    money:{                 //金额
        type:Number,
        default: 0
    },                      
    settled:{               //已结算
        type:Number,
        default: 0
    },
    unSettled:{             //待结算
        type:Number,
        default: 0
    }

});