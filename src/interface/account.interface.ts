export interface AccountInterface {
    
    accountName?:String;         //开户名
    mainCollectionNum?:Number;       //主收款
    type?:String;                    
    certificateNumber?:String;      //证件号
    cardId?:Number;                 //银行卡号
    bankName?:String;  
    status?:String;
    postage?:String;              //资费
    auditSubmitTime?:Number;      //审核提交时间
    auditCompletedTime?:Number;   //审核完成时间
    cardholder?:String;            //持卡人
    money?:Number;
}