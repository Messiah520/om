import * as mongoose from 'mongoose';

// const Collection = new mongoose.Schema({
//     mainCollection:Number,      //主收款
// });

export const UserSchema = new mongoose.Schema({
    
    userNum:{               //账户
        type:String,
        default: ''
    },         
    userName:{              //商户名
        type:String,
        default: ''
    },        
    userType:{              //用户类型
        type:String, 
        default: ''
    },       
    password:{              //密码
        type:String,
        default: ''
    },        
    postage:{               //资费
        type:String,
        default: ''
    },         
    userStatus:{            //用户状态
        type:String,
        default:'正常'
    },      
    weChat:{
        type:String,
        default: ''
    }          
});