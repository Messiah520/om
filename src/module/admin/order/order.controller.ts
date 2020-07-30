import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from 'src/service/order/order.service';
import { AccountLogService } from 'src/service/account-log/account-log.service';

@Controller('order')
export class OrderController {

    constructor(private readonly orderService:OrderService,
                private readonly accountLogService:AccountLogService){}

    //支付查询
    @Post('findOrder')
    find(@Body() param){
        return this.orderService.find(param);
    }

    //订单生成
    @Post('addOrder')
    add(@Body() param){
        return this.orderService.add(param);
    }

    //记账日志生成
    @Post('addAccountLog')
    addAccountLog(@Body() params) {
        return this.accountLogService.add(params);
    }

    //记账日志查询
    @Post('findAccountLog')
    findAccountLog(@Body() params) {
        return this.accountLogService.findAll(params);
    }


}
