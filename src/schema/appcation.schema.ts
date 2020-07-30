import * as mongoose from 'mongoose';

export const ApplicationSchema = new mongoose.Schema({
    
    appName:{
        type:String
    },
    APPCODE:{
        type:String
    },
    appRate:{
        type:Number
    },
    mainCollectionNum:{     //主收款
        type:Number
    },
    number:{                //数量
        type:Number
    }

});