//结算记录

//利用定时任务
import * as mongoose from 'mongoose';

export const SettlementSchema = new mongoose.Schema({

    orderNum: {         //转账单号
        type: String,
        default: ''
    },
    chargingNum: {         //计费单号
        type: String,
        default: ''
    },
    mainCollectionNum: {            //主收款
        type: String,
        default: ''
    },
    cardId: {                       //银行卡号
        type: String,
        default: ''
    },
    submitTime: {              //提交时间
        type:Date,
        default: ''
    },
    transferAccountTime: {       //转账时间
        type: Date,
        default: Date.now
    },
    mechanism: {        //机构
        type: String,
        default: ''
    },
    postage: {          //资费
        type: String,
        default: ''  
    },
    status: {           //状态  转账中/成功/失败
        type: String,
        default: ''
    },
    transferInfo: {     //转出信息
        type: String,
        default: ''
    },

    //统计：成功笔数，成功交易金额，转账中交易笔数，转账中交易金额
});