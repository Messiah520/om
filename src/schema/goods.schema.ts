import * as mongoose from 'mongoose';

export const GoodsSchema = new mongoose.Schema({
    
    picture:{               //图片
        type:String
    },
    goodsName:{             //商品名称
        type:String
    },
    goodsType:{             //商品类型
        type:String
    },
    range:{                 //商品范围
        type:String
    },
    price:{                 //价格
        type:Number
    },
    specifications:{        //规格
        type:String
    },
    detailsMap:{            //详情图
        type:String
    },
    describe:{              //描述
        type:String
    },
    status:{                //状态
        type:String
    },
    operate:{               //操作
        type:String
    },
    auditSubmitTime:{       //审核提交时间
        type:String
    },
    auditCompleteTime:{     //审核完成时间
        type:String,
    }

});
