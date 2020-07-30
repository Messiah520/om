import * as mongoose from 'mongoose';

// const Collection = new mongoose.Schema({
//     mainCollection:Number,      //主收款
// });

export const UserSchema = new mongoose.Schema({
    
    userNum:{               //账户
        type:String,
    },         
    userName:{              //商户名
        type:String,
    },        
    userType:{              //用户类型
        type:String, 
    },       
    password:{              //密码
        type:String,
    },        
    postage:{               //资费
        type:String,
    },         
    userStatus:{            //用户状态
        type:String,
        default:'正常'
    },      
    weChat:{
        type:String,
    }          
});