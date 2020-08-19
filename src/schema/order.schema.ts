import * as mongoose from 'mongoose';

const d = new Date();

export const OrderSchema = new mongoose.Schema({
    
    APPCODE: {          //订单号直接关联APPCODE，有利于加快查询熟读 
        type:String,
        default: ''
    },
    orderNum:{
        type:String,
        default: ''
    },
    equipmentNum:{
        type:String,
        default: ''
    },
    payChannel:{            //支付渠道
        type:String,
        default: ''
    },
    app:{
        type:Number,
        default: 0
    },
    orderAmount:{           //订单金额
        type:Number,
        default: 0
    },
    createTime:{            //创建时间
        type:Date,
        default:() => new Date()
    },
    payStatus:{             //支付状态
        type:String,
        default: ''
    },
    shipmentStatus:{        //出货状态
        type:String,
        default: ''
    }

});