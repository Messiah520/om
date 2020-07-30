import * as mongoose from 'mongoose';

export const EquipmentSchema = new mongoose.Schema({
    equipmentNum:{
        type:Number,        //设备号
    },
    equipmentName:{
        type:String,       //设备名称
    },
    bindingStatus:{
        type:String,       //绑定状态
    },
    bindingUserNum:{
        type:Number,      //绑定用户
    },
    mainCollectionNum:{
        type:Number,      //主收款
    },
    bindingTime:{
        type:Number,         //绑定时间 
    },            
    operator:{
        type:String,            //操作人
    },
    operate:{
        type:String,             //操作
    },
    transferNum:{
        type:Number,         //转送次数
    },
    originalAccount:{           //原账户
        type:Number,     
    },
    remark:{                    //备注
        type:String,
    },
    productionTime:{            //生产时间
        type:Number,
    },
    APPID:{
        type:Number,
    },
    IMEI:{
        type:Number,
    },


});