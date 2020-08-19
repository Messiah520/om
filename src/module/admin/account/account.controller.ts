import { Controller, Post, Body, Get } from '@nestjs/common';
import { AccountService } from 'src/service/account/account.service';
import { AccountInterface } from 'src/interface/account.interface';

@Controller('account')
export class AccountController {

    constructor(private readonly accountService:AccountService){}

    //银行卡新增
    @Post('add')
    async add(@Body() params){

        var account = await this.accountService.find(params);

        console.log(account);

        if( account!=null || account.length>0  ){
            return 'the account has on';
        }

        return await this.accountService.add(params);
        
    }

    //银行卡查询
    @Post('find')
    async findAll(@Body() params){
        return await this.accountService.findAll(params);
    }

    //通过审核    批量通过审核
    @Post('pass')
    async pass(@Body() params){
        var json = { status:'正常' };
        return await this.accountService.update(params,json);
    }
    
    //绑定银行卡
    @Post('binding')
    async binding(@Body() params){
        var json = { mainCollectionNum:params.mainCollectionNum };
        var array = await this.accountService.find(json);
        console.log(array.length);
        if( array.length>0 ){
            return '该主收款账号已绑定银行卡';
        }
        return await this.accountService.add(params);
    }

    //解除银行卡绑定
    @Post('unBind')
    async unBind(@Body() params){

        var json = { mainCollectionNum: '' };

        return await this.accountService.update(params,json);

    }

/////////////////////////////test

    @Get('test')
    async test(){

        return await this.accountService.getModel().find().exec();
    
    }


    

}
