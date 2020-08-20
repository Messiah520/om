import * as mongoose from 'mongoose';

//主收款信息表
export const MainCollectionSchema = new mongoose.Schema({

    userNum:{               //账户（关联user表的userNum）
        type:String,
        default: ''
    },             
    mainCollectionNum:{     //主收款账户
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