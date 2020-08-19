import * as mongoose from 'mongoose';

const d = new Date();
//银行卡
export const AccountSchema = new mongoose.Schema({
    
    accountName:{               //开户名
        type:String,
        default: ''
    },          
    mainCollectionNum:{         //主收款账号
        type:String,
        default: '' 
    },      
    type:{                      //账号类型
        type:String,
        default: ''
    },      
    certificate:{         //证件号，对私账户只有证件号
        type:String,
        default: ''
    },
    cardId:{
        type:String,
        default: ''
    },         
    bankName:{                  //银行名称
        type:String,
        default: ''
    },
    status:{                    //银行卡状态
        type:String,
        default:'待审核'
    },
    postage:{                    //资费
        type:String,
        default: ''
    },              
    auditSubmitTime:{            //审核提交时间
        type:Date,
        default:d.getTime()
    },      
    auditCompletedTime:{         //审核完成时间
        type:Date,
        default:Date.now
    },   
    cardholder:{                 //持卡人
        type:String,
        default: ''
    },
    money:{
        type:Number,
        default: 0
    },                
    license: {                  //营业执照
        type: String,
        default: ''
    },
    legalPerson: {              //法人姓名
        type: String,
        default: ''
    },
    legalCertificate: {          //法人证件号 对公账户只有法人证件号
        type: String,
        default: ''
    }

});