import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from 'src/service/order/order.service';
import { AccountLogService } from 'src/service/account-log/account-log.service';
import { EquipmentService } from 'src/service/equipment/equipment.service';
import { SettlementService } from 'src/service/settlement/settlement.service';
import { machineId, machineIdSync } from 'node-machine-id';
import { uuid } from 'node-uuid';
import { json } from 'express';

@Controller('order')
export class OrderController {

    constructor(private readonly orderService:OrderService,
                private readonly accountLogService:AccountLogService,
                private readonly equipmentService : EquipmentService,
                private readonly settlementService: SettlementService){}

    /*
    当订单生产的时候，且支付状态为已经支付，就会生成两个记账日志 （订单生成的时候，同时生成两个记账日志）

    步骤：1，找到涉及的两个主收款账号  body包含了设备号， 可以通过设备号查询到其对应的主收款账号
         2，根据费率： 分别存入以上的两个主收款账号
         3，
    */
    //body包含了设备号， 可以通过设备号查询到其对应的主收款账号
    @Post('saveOrder')
    async saveOrder(@Body() body) {
        //订单添加成功后，返回的结果
        var result = await this.orderService.add(body);

        var money = body.money;
        var money1 = money1*0.006;
        var money2 = money - money;

        //找到对应设备的 主收款账号
        var equipment = await this.equipmentService.find({'equipmentNum' : body.equipmentNum});
        var mainCollection = equipment.equipmentNum;

        //中间商的主收款号
        var middleMainCollection = '10001';

        //中间商的主收款号
        var json1 = {
            orderNum : body.orderNum,
            mainCollection : middleMainCollection,
            app : body.app,
            transferInAmount : money1,
            income : money1
        };

        //商家的主收款号
        var json2 = {
            orderNum : body.orderNum,
            mainCollection : mainCollection,
            app : body.app,
            transferInAmount : money2,
            income : money2
        };

        //生成两个记账日志
        if( result && result.payStatus == '已支付' ) {
            this.accountLogService.add(json1);
            this.accountLogService.add(json2);
        }
    }

    //支付查询
    @Post('payStatus')
    async findByPayStatus(@Body() json) {

        const pageNum = Number(json.pageNum);
        const pageSize = Number(json.pageSize);

        var sort = { createTime : -1 };

        if( !json.payStatus && !json.equipmentNum && !json.payChannel
            && !json.orderNum && !json.app && !json.startTime && !json.endTime ){
                return {};
        }
        if( !json.payStatus ){
            json.payStatus = '';
        }
        if( !json.equipmentNum ){
            json.equipmentNum = '';
        }
        if( !json.payChannel ){
            json.payChannel = '';
        }
        if( !json.orderNum ){
            json.orderNum = '';
        }
        if( !json.app ){
            json.app = '';
        }
        if( !json.startTime ){
            json.startTime = '';
        }
        if( !json.endTime ){
            json.endTime = '';
        }

        var result = await this.orderService.findByPayStatus(pageNum, pageSize, sort, json);

        var paymentNum = await this.orderService.getPaymentNum();

        var paymentAmount = await this.orderService.getPaymentAmount();

        return {
            //查询结果
            'result': result,
            //已支付笔数
            'paymentNum': paymentNum,
            //已支付金额
            'paymentAmount': paymentAmount
        }
    }

    //出货查询
    @Post('shipment')
    async findByShipment(@Body() json) {

        const pageNum = Number(json.pageNum);
        const pageSize = Number(json.pageSize);

        var sort = { createTime : -1 };

        if( !json.shipmentStatus && !json.equipmentNum && !json.payChannel
            && !json.orderNum && !json.app && !json.startTime && !json.endTime ){
                return {};
        }
        if( !json.shipmentStatus ){
            json.shipmentStatus = '';
        }
        if( !json.equipmentNum ){
            json.equipmentNum = '';
        }
        if( !json.payChannel ){
            json.payChannel = '';
        }
        if( !json.orderNum ){
            json.orderNum = '';
        }
        if( !json.app ){
            json.app = '';
        }
        if( !json.startTime ){
            json.startTime = '';
        }
        if( !json.endTime ){
            json.endTime = '';
        }

        var result = await this.orderService.findByShipment(pageNum, pageSize, sort, json);

        return {
            result: result
        }
    }

    //订单生成
    @Post('addOrder')
    add(@Body() param){
        return this.orderService.add(param);
    }

    //记账日志查询
    @Post('findAccountLog')
    findAccountLog(@Body() params) {
        return this.accountLogService.findAll(params);
    }

    /*
    单号相似的两条， 先主收款，后商家的主收款
    订单号一样的一起的基础上 按记账时间降序
    */
   @Post('queryAccountLog')
   async queryAccountLog(@Body() body) {
        /*
            当每个条件框输入的信息为空（空格 null undifined)
            返回 查询结果为空
            否则 进行多条件模糊匹配 
            前提进行 字符串除去左右空格
            如果需要对数字进行匹配时建议用 字符串来保存数字，
            当对数字进行 运算时 把它转换为数字
            时间的比较
        */
        /*
            如何处理并发问题
            以连续生成两个记账日志为 “一个事物”
        */

        /**
         * 
         * if(都是空){
         *  return []
         * }
         * 
         * 
         * if( !body.type ){
         *  body.type == '';
         * }
         * 
         */
        
        var result = await this.accountLogService.getModel().aggregate([
            {
                $match : {
                    $and : [
                        {
                            type : { $regex : body.type }
                        },{
                            mainCollection : { $regex : body }
                        },{
                            orderNum : { $regex : body }
                        },{
                            app : { $regex : body }
                        },{
                            accounttingTime : { $gte : body.startTime }
                        },{
                            accounttingTime : { $lte : body.endTime }
                        }
                    ]
                }
            },{
                $sort : { 'accounttingTime' : -1 }
            }
        ])
   }


   //根据pageSize返回页数
   @Post('pageNum')
   async pageNum(@Body() json) {

    var pageSize = Number(json.pageSize);

    const count = await this.orderService.getModel().find().count();

    //返回天花板数
    return Math.ceil(count/pageSize);
   }

   //accountLog 根据size的页数查询
   @Post('accountLog_Conut')
   async accountLog_Conut(@Body() json) {

        const pageSize = Number(json.pageSize);

        const count = this.accountLogService.getModel().find().count();

        //返回页数，为天花板数
        //可以了解天花板数的算法如何实现
        return Math.ceil(count/pageSize);
   }


   //支付渠道
   //统计总额 统计总笔数
   //加上时间区间的统计
   /**
    * 昨日的定义：昨日00:00:00到23:59:59
    * 
    * 近7日的定义：时间区间为7天
    * 
    * 本月：这个月的第一天的零点到 当前系统时间
    */
   @Post('payChannel')
   async payChanel() {
    //金额
    const result1 = await this.orderService.getModel().aggregate([
        {
            $match: { payStatus : '成功' }
        },
        {
            $group: { _id : "$payChannel" , total: {$sum: '$orderAmount'} }
        }
    ]);
    
    const result2 = await this.orderService.getModel().aggregate([
        {
            $match: { payStatus: '成功'}
        },
        {
            $group: { _id : '$payChannel' , total : { $sum : 1 }}
        },
    ]);

    return {
        result1:result1,
        result2:result2
    }

   }

/////////////////////////////////////////////////////测试
    @Post('qm')
    async qm() {

    return await this.orderService.getModel().find().count();

    }

    @Post('saveOne')
    async saveOne(@Body() json) {

    return await this.orderService.add(json);

    }

    @Get('queryAll')
    async queryAll(@Body() json){

    return await this.orderService.getModel().find().exec();

    }

   //测试方法
   @Get('tx')
   async tx() {
    //天花板数
    console.log(Math.ceil(4/3));
    //生成同一个 机器码
    var id = await machineId();
    var id1 = await machineId();
    //var id2 = await machineIdSync({ original: true });
    /**
     * 
     */
    // var uuid = require('node-uuid');
    // nest的语法 import { uuid } from 'node-uuid' 有错
    // //建议使用v1 根据时间戳生成，唯一
    // var uuid11 = uuid.v1();
    // var uuid12 = uuid.v1();
    // //根据随机数生成  可能不唯一
    // var uuid4 = uuid.v4(); 
    // console.log(id);
    // console.log(id1);
    // console.log('uuid uuid11: '+uuid11);
    // console.log('uuid uuid12: '+uuid12);
    // console.log(uuid4);
    var num = 5/3;
    console.log(num);
    //取小数后两位
    console.log(num.toFixed(2));    
    console.log(1.646.toFixed(2));
   }

}
