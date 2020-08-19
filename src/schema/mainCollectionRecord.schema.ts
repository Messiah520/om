import * as mongoose from 'mongoose';

export const mainCollectionRecordSchema = new mongoose.Schema({

    mainCollectionNum: {
        type: String,
        default: ''
    },
    operator: {             //操作人
        type: String,
        default: ''
    },
    // operate: {
    //     type: String,
    // },
    acceptanceDesc: {       //受理描述
        type: String,
        default: ''
    },
    acceptanceType: {       //受理描述
        type: String,
        default: ''
    },
    actionTime: {           //受理时间
        type: Date,
        default: Date.now
    },

    
})