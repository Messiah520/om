import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from 'src/service/account/account.service';
import { AccountInterface } from 'src/interface/account.interface';

@Controller('account')
export class AccountController {

    constructor(private readonly accountService:AccountService){}

    //银行卡新增
    @Post('add')
    add(@Body() params){
        return this.accountService.add(params);
    }

    //银行卡查询
    @Post('find')
    findAll(@Body() params){
        return this.accountService.findAll(params);
    }

    //通过审核
    @Post('pass')
    pass(@Body() params){
        var json = { status:'正常' };
        return this.accountService.update(params,json);
    }
    
    //绑定银行卡
    @Post('binding')
    binding(@Body() params){
        var json = { mainCollectionNum:params.mainCollectionNum };
        var array = this.accountService.find(json);
        if( array != null ){
            return '该主收款账号已绑定银行卡';
        }
        return this.accountService.add(params);
    }

    //解除绑定
    @Post('unBind')
    unBind(@Body() params){

    }

    

}
