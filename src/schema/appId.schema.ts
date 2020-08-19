import * as mongoose from 'mongoose';

const d = new Date();

export const AppIdSchema = new mongoose.Schema({

    APPID:{
        type:Number
    },
    APPCODE:{               //绑定的AppCODE
        type:String
    },
    applyTime:{             //申请时间
        type:Date,
        default:d.getTime()
    }
    
});