import * as mongoose from 'mongoose';

export const EquipmentSchema = new mongoose.Schema({

    equipmentNum:{
        type:String,        //设备号
    },
    equipmentName:{
        type:String,       //设备名称
    },
    status:{
        type:String,       //绑定状态
    },
    userNum:{
        type:String,       //绑定用户
    },
    mainCollectionNum:{
        type:String,       //主收款
    },
    bindingTime:{
        type:Date,         //绑定时间 
    },            
    transferNum:{
        type:Number,       //转送次数
    },
    remark:{               //备注
        type:String,
    },
    productionTime:{       //生产时间
        type:Date,
    },
    APPID:{
        type:Number,
    },
    IMEI:{
        type:Number,
    },


});