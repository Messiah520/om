import * as mongoose from 'mongoose';

const d = new Date();

export const AccountSchema = new mongoose.Schema({
    
    accountName:{               //开户名
        type:String,
    },          
    mainCollectionNum:{         //主收款账号
        type:Number, 
    },      
    type:{
        type:String,
    },      
    certificateNumber:{
        type:Number,
    },
    cardId:{
        type:Number,
    },         
    bankName:{                  //银行名称
        type:String,
    },
    status:{                    //银行卡状态
        type:String,
        default:'待审核'
    },
    postage:{                    //资费
        type:String,
    },              
    auditSubmitTime:{            //审核提交时间
        type:Number,
        default:d.getTime()
    },      
    auditCompletedTime:{         //审核完成时间
        type:Number,
    },   
    cardholder:{                 //持卡人
        type:String,
    },
    money:{
        type:Number,
    }                
});