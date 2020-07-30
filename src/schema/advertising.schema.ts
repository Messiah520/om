import * as mongoose from 'mongoose';

export const AdvertisingSchema = new mongoose.Schema({

    picture:{
        type:String
    },
    advertisingName:{
        type:String
    },
    position:{
        type:String
    },
    sort:{
        type:Number
    },
    startTime:{         //开始时间
        type:Number
    },
    endTime:{           //结束时间
        type:Number
    },
    link:{
        type:String
    },
    status:{
        type:String
    }

});