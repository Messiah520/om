import * as mongoose from 'mongoose';

export const ApplicationSchema = new mongoose.Schema({
    
    appName:{
        type:String,
        default: ''
    },
    APPCODE:{
        type:String,
        default: ''
    },
    appRate:{               //应用费率
        type:Number,
        default: ''
    },
    mainCollectionNum:{     //主收款
        type:String,
        default: ''
    },
    number:{                //数量
        type:Number,
        default: ''
    },
    integratorNum: {        //绑定的集成商账号，
        type: String,
        default: ''
    },
    


});