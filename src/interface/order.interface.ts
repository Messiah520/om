export interface OrderInterface {
    orderNum?:Number;
    equipmentNum?:Number;
    payChannel?:Number;
    app?:Number;
    orderAmount?:Number;
    createTime?:Number;         //创建时间
    payStatus?:String;          //支付状态
    shipmentStatus?:String;     //出货状态
}