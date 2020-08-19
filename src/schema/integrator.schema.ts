//集成商

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const d = new Date();

export const IntegratorSchema = new mongoose.Schema({

    integratorNum: {
        type: String,
        default: ''
    },
    integratorName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    integratorRate: {
        type: Number,
        default: 0
    },
    appRate: {
        type: Number,
        default: 0
    },
    postage: {              //资费
        type: String ,   
        default: ''    
    },
    total: {                //设备总台数
        type: Number,
        default: 0
    },
    existence: {            //尚存设备数
        type: Number,
        default: 0
    },
    integratorStatus: {     //用户状态
        type: String,
        default: ''
    },


})