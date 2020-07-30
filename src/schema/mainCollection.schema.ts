import * as mongoose from 'mongoose';

export const MainCollectionSchema = new mongoose.Schema({
    userNum:{               //账户
        type:Number,
    },             
    mainCollectionNum:{       //主收款
        type:Number,
    },      
    money:{                 //金额
        type:Number,
    },                      
    operator:{              //操作人
        type:String,
    },
    actionType:{            //受理类型
        type:String,
    },
    actionTime:{            //受理时间
        type:Number,
    },
    actionDescription:{     //受理描述
        type:String,
    },
    settled:{               //已结算
        type:Number,
    },
    unSettled:{             //待结算
        type:Number,
    }

});