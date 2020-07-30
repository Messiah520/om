import * as mongoose from 'mongoose';

export const ActivitieSchema = new mongoose.Schema({

    activitieName:{
        type:String
    },
    commodityRange:{
        type:String
    },
    details:{
        type:String
    },
    activitieType:{         //活动类型
        type:String
    },
    startTime:{             //活动开始时间
        type:Number
    },
    endTiem:{               //活动结束时间
        type:Number
    },
    link:{
        type:String
    },
    status:{
        type:String
    },

});