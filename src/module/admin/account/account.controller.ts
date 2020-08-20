import { Controller, Post, Body, Get } from '@nestjs/common';
import { AccountService } from 'src/service/account/account.service';
import { AccountInterface } from 'src/interface/account.interface';


@Controller('account')
export class AccountController {

    constructor(private readonly accountService: AccountService){}

    //银行卡新增
    @Post('add')
    async add(@Body() params){

        var accounts = await this.accountService.find(params);

        console.log(accounts);

        if( accounts.length<=0 ){
            return await this.accountService.add(params);
        }

        return '银行卡已经存在'
        
    }

    //银行卡查询 pro
    //分页 排序时间倒序
    @Post('queryBankCard')
    async query(@Body() json) {

        //页码和size
        const pageNum = Number(json.pageNum);
        const pageSize = Number(json.pageSize);

        //当查询的条件全空时，包括空格 返回的查询结果为空
        if( !json.status && !json.cardId && !json.auditSubmitTime && !json.auditCompletedTime ){
            return {};
        }

        if( !json.status ){
            json.status = '';
        }

        if( !json.cardId ){
            json.cardId = '';
        }

        if( !json.auditSubmitTime ){
            json.auditSubmitTime = '';
        }

        if( !json.auditCompletedTime ){
            json.auditCompletedTime = '';
        }

        //根据审核完成的时间排倒序
        var sort = { auditCompletedTime : -1 };

        var result  = await this.accountService.aggregate(pageNum,pageSize,sort,json);

        return {
            result: result
        }

    }

    //通过审核
    @Post('pass')
    async pass(@Body() params){
        var json = { status:'正常' };
        return await this.accountService.update(params,json);
    }
    
    //绑定银行卡
    @Post('bindingCard')
    async bindingCard(@Body() params){
        var json = { mainCollectionNum:params.mainCollectionNum };
        var array = await this.accountService.find(json);
        console.log(array.length);

        if( array.length<=0 ){
            return await this.accountService.add(params);   
        }

        return '该主收款账号已绑定银行卡';
        
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

    //银行卡查询 根据条件查询审核或待审核
    @Post('find')
    async findAll(@Body() params){
        return await this.accountService.findAll(params);
    }


    

}
