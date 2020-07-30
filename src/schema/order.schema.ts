import * as mongoose from 'mongoose';

const d = new Date();

export const OrderSchema = new mongoose.Schema({
    
    orderNum:{
        type:Number,
    },
    equipmentNum:{
        type:Number,
    },
    payChannel:{            //支付渠道
        type:String,
    },
    app:{
        type:Number,
    },
    orderAmount:{           //订单金额
        type:Number,
    },
    createTime:{            //创建时间
        type:Number,
        default:d.getTime()
    },
    payStatus:{             //支付状态
        type:String,
    },
    shipmentStatus:{        //出货状态
        type:String,
    }

});