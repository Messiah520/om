export interface AccountInterface {
    
    accountName?:String;         //开户名
    mainCollectionNum?:String;       //主收款
    type?:String;                    
    certificate?:String;      //证件号
    cardId?:String;                 //银行卡号
    bankName?:String;  
    status?:String;
    postage?:String;              //资费
    auditSubmitTime?:Date;      //审核提交时间
    auditCompletedTime?:Date;   //审核完成时间
    cardholder?:String;            //持卡人
    money?:Number;
    license?:String;            //营业执照
    legalPerson?:String;        //法人姓名
    legalCertificate?:String;   //法人证件号

}