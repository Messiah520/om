import * as mongoose from 'mongoose';

export const AdvertisingSchema = new mongoose.Schema({

    // _id:{
    //     type:String
    // },
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
    startTime:{             //开始时间
        type:Date
    },
    endTime:{               //结束时间
        type:Date
    },
    link:{
        type:String
    },
    status:{
        type:String
    }

});