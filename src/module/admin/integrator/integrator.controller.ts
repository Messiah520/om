import { Controller, Post, Body, Get } from '@nestjs/common';
import { IntegratorService } from 'src/service/integrator/integrator.service';
import { AppIdService } from 'src/service/app-id/app-id.service';
import { AppIdRecordService } from 'src/service/app-id-record/app-id-record.service';
import { json } from 'express';
import { AccountService } from 'src/service/account/account.service';
import { MainCollectionNumRecordService } from 'src/service/main-collection-num-record/main-collection-num-record.service';
import { ApplicationService } from 'src/service/application/application.service';
import { MainCollectionService } from 'src/service/main-collection/main-collection.service';
import { OrderService } from 'src/service/order/order.service';

@Controller('integrator')
export class IntegratorController {

    constructor(private readonly integratorService: IntegratorService,
                private readonly appIDService: AppIdService,
                private readonly appIdRecordService: AppIdRecordService,
                private readonly accountService: AccountService,
                private readonly recordService: MainCollectionNumRecordService,
                private readonly applicationService: ApplicationService,
                private readonly mainCollectioService: MainCollectionService,
                private readonly orderService: OrderService,
                ){}

    //////待测试
    //集成商开户
    @Post('add')
    async addIntegrator(@Body() body) {

        var integrator = await this.integratorService.find(body);

        if( integrator.length<=0 ){
            return await this.integratorService.add(body);
        }

        return '用户已存在';

    }

    
    //集成商概况：
    @Post('find')
    async findIntegrator(@Body() body) {

        return await this.integratorService.find({});

    }

    //集成商修改密码
    @Post('updatePwd')
    async updatePwd(@Body() body) {
        var json1 = { 'integratorNum' : body.integratorNum };
        var json2 = { 'password' : body.password };

        return await this.integratorService.update(json1,json2);
    }

    //涉及
    //集成商信息查询
    @Post('relation')
    async relation(@Body() json){

        const pageNum = Number(json.pageNum);
        const pageSize = Number(json.pageSize);

        if( !json.integratorName && json.integratorNum && json.cardId ){
            return [];
        }

        if( !json.integratorName ){
            json.integratorName = '';
        }
        if( !json.cardId ){
            json.cardId = '';
        }
        if( !json.integratorNum ){
            json.integratorNum = '';
        }

        //集成商信息
        const integrator = await this.integratorService.aggregate(json);

        const relation = await this.accountService.getModel().aggregate([
            {
                $lookup: {
                    from: 'mainCollection',
                    loaclField: 'mainCollectionNum',
                    foreignField: 'mainCollectionNum',
                    as: 'items'
                }
            },
            {
                $match: {
                    $and: [
                        { 
                            $regex : { cardId : json.cardId}
                        }
                    ]
                }
            }
        ]);

        //主收款变更记录
        const record = await this.recordService.aggregate(json);

        return {
            integrator: integrator,
            relation: relation,
            record: record,
        }

    }

    //应用订单概况 昨日/近7日/本月的统计
    //分支付笔数  支付金额
    /**
     * 应用订单概况又是啥
     * 解答：所用应用产生的所有订单
     * 运维平台可以看到所有
     * 
     * order关联appcode 再关联integrator
     */
    @Post('queryAppOrder')
    async queryAppOrder(@Body() body) {

        const result1 = await this.orderService.getModel().aggregate([
            {
                $match: { payStatus : '成功' }
            },
            //分组，
            {
                $group: { _id : '$APPCODE', total: { $sum : '$orderAmount' } }
            }
        ]);

        const result2 = await this.orderService.getModel().aggregate([
            // {
            //     $match: { payStatus : '成功' }
            // },
            //分组，
            {
                $group: { _id : '$APPCODE', count: { $sum : 1 } }
            }
        ]);
        

        return {
            result1: result1,
            result2: result2
        }

    }


    //APPID转送操作  转送的时候生成一条转送记录 
    @Post('transfer')
    async transfer(@Body() json){
        var uuid = require('node-uuid');

        var application = await this.applicationService.find(json.APPCODE);

        if( application.length <= 0){
            return 'application no';
        }
        //生成任意appid
        for( var i=0; i<json.number; i++) {
            var appId = { APPCODE : json.APPCODE, APPID : uuid.v1()};
            await this.appIDService.add(appId);
        }

        //APPCEODE绑定到集成商
        await this.applicationService.update({
            APPCODE : json.APPCODE
        },{
            integratorNum : json.integratorNum
        });

        //生成转送记录
        var json1 = { appName : json.appName, 
                      APPCODE : json.APPCODE,
                      num : json.num,
                      targetAccount : json.targetAccount,
                      operator : json.operator,
                      };
        await this.appIdRecordService.addRecord(json1);
    }

    //查询未被绑定的APPCODE
    @Post('queryAppCode')
    async queryAppCode(){
        return this.applicationService.find({ integratorNum : ''});
    }

    //APPID转送记录
    @Post('transferRecord')
    async transferRecord(@Body() json) {

        if( !json.appName && !json.APPCODE && !json.targetAccount && !json.transferTime ){
            return [];
        }
        if( !json.appName ){
            json.appName = '';
        }
        if( !json.APPCODE ){
            json.APPCODE = '';
        }
        if( !json.transferTime ){
            json.transferTime = '';
        }
        if( !json.targetAccount ){
            json.targetAccount = '';
        }
        const result = await this.appIdRecordService.getModel().aggregate([
            {
                $match: {
                    $and: [
                        {
                            $regex: { appName: json.appName }
                        },
                        {
                            $regex: { APPCODE: json.APPCODE }
                        },
                        {
                            $regex: { targetAccount: json.targetAccount }
                        },
                        // {
                        //     createTime : { $get : json.startTime }
                        // },
                        // {
                        //     createTime : { $let : json.endTime }
                        // }
                        {
                            transferTime : { $get : json.startTime }
                        },
                        {
                            transferTime : { $let : json.endTime }
                        }
                    ]
                }
            },
        ]);

        return result;
    } 


    //绑定银行卡
    @Post('bindingCard')
    async bindingCard(@Body() params) {
        var json = { mainCollectionNum:params.mainCollectionNum };
        var array = await this.accountService.find(json);
        console.log(array.length);

        if( array.length>0 ){
            return '该主收款账号已绑定银行卡';
        }
        return await this.accountService.add(params);
    }

    //解除绑定，解除对主收款的绑定
    @Post('unBind')
    async unBind(@Body() params){

        var json = { mainCollectionNum: '' };

        return await this.accountService.update(params,json);

    }


    //注销账号时，解除所有银行卡的绑定
    @Post('cancel')
    async cancel(@Body() body) {

        var json = { 'integratorStatus': '已注销' };
        await this.integratorService.update(body,json);

        var mainResult = await this.mainCollectioService.find(body);

        var mainArray = [];
        mainResult.forEach(element => {
            mainArray.push(element.mainCollectionNum.toString());
        });

        console.log(mainArray);

        /**
         * 1.找到对应集成商账号对应的所有主收款账号
         * 2.修改对应的银行卡绑定的主收款账号
         */
         for( var i=0;i<mainArray.length;i++){
             await this.accountService.update({'mainCollectionNum':mainArray[i]},{'mainCollectionNum':''});
         }

    }

////////////////////////
    //多表查询之分组
    @Post('test')
    async test(){
        //笔数
        const result1 = await this.applicationService.getModel().aggregate([
            {
                $lookup: {
                    from : 'order',
                    localField : 'APPCODE',
                    foreignField : 'APPCODE',
                    as : 'items1'
                }
            },
            {
                $lookup: {
                    from : 'integrator',
                    localField : 'integratorNum',
                    foreignField : 'integratorNum',
                    as : 'items2'
                }
            },
            {
                $group: { _id : '$integratorName' , total : { $sum : 1}}
            }
        ]);

        //金额
        const result2 = await this.applicationService.getModel().aggregate([
            {
                $lookup: {
                    from : 'order',
                    localField : 'APPCODE',
                    foreignField : 'APPCODE',
                    as : 'items1'
                }
            },
            {
                $lookup: {
                    from : 'integrator',
                    localField : 'integratorNum',
                    foreignField : 'integratorNum',
                    as : 'items2'
                }
            },
            {
                $group: { _id : '$integratorNum' , total : { $sum : '$orderAmount'}}
            }
        ]);

        var result3 = await this.orderService.getModel().aggregate([
            {
                $lookup: {
                    from : 'order',
                    localField : 'APPCODE',
                    foreignField : 'APPCODE',
                    as : 'items1'
                }
            },
            {
                $group: { _id : '$APPCODE' , total : { $sum : '$orderAmount'}}
            }
        ]);

        
        return {
            result1: result1,
            result2: result2,
            result3: result3
            
        }
    }


    //大于小于的测试
    // {
    //     createTime : { $get : json.startTime }
    // },
    // {
    //     createTime : { $let : json.endTime }
    // }
    @Get('demo')
    async demo(){
        var result = await this.orderService.getModel().aggregate([
            {
                $match : {
                    $and : [
                        {
                            orderAmount : { $gte : 0 }
                        },
                        {
                            orderAmount : { $lte : 99 }
                        }
                    ]
                }
            }
        ]);

        return result;
        
    }

}
