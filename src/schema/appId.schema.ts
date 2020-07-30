import * as mongoose from 'mongoose';

const d = new Date();

export const AppIdSchema = new mongoose.Schema({

    APPID:{
        type:Number
    },
    APPCODE:{
        type:String
    },
    applyTime:{             //申请时间
        type:Number,
        default:d.getTime()
    }
    
});