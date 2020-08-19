export interface OrderInterface {

    APPCODE?:String;
    orderNum?:String;
    equipmentNum?:String;
    payChannel?:String;
    app?:String;                //应用
    orderAmount?:Number;        //订单金额
    createTime?:Date;         //创建时间
    payStatus?:String;          //支付状态
    shipmentStatus?:String;     //出货状态
    
    //附加的两个时间
    startTime?:Date;
    endTime?:Date;
}