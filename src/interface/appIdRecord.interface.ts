export interface AppIdRecordInterface {

    appName?: String;
    APPCODE?: String;
    num?: Number;
    targetAccount?: String;
    transferTime?: Date;
    operator?: String;

    //附加的验证字段，与对应schema关
    startTime?: Date;
    endTime?: Date;
    
}