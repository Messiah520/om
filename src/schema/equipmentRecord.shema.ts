//设备转送足迹

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const d = new Date();

export const EquipmentRecordSchema = new mongoose.Schema({

    equipmentNum: {
        type: String,
        default: ''
    },
    userNum: {
        type: String,
        default: ''
    },
    mainCollectionNum: {
        type: String,
        default: ''
    },
    transferTime: {             //转送时间
        type: Date,
        default: Date.now
    },
    operator: {                 //操作人
        type: String, 
        default: ''            
    },
    originalAccount: {           //原账户
        type:String,    
        default: '' 
    },
    remark: {                   //备注
        type: String,
        default: ''
    }
});