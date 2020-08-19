//设备转送足迹

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const d = new Date();

export const EquipmentRecordSchema = new mongoose.Schema({

    equipmentNum: {
        type: String,
        default: ''
    },
    bindingUserNum: {
        type: String,
        default: ''
    },
    mainCollectionNum: {
        type: String,
        default: ''
    },
    transferTime: {
        type: Date,
        default: Date.now
    },
    operator: {
        type: String, 
        default: ''           //操作人
    },
    originalAccount: {           //原账户
        type:String,    
        default: '' 
    },
    remark: {
        type: String,
        default: ''
    }
});