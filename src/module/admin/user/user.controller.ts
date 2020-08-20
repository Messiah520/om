import { Controller, Get, Post, Body, Param, UseGuards, Query ,Request} from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleAuthGuard } from 'src/guard/role-auth.guard';
import { AccountService } from 'src/service/account/account.service';
import { MainCollectionNumRecordService } from 'src/service/main-collection-num-record/main-collection-num-record.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService,
                private readonly accountService: AccountService,
                private readonly recordService: MainCollectionNumRecordService,
                
                ){}

    //@UseGuards(AuthGuard('jwt'))
    @Get('findAll')
    async findAll(){
        return await this.userService.findAll();
    }

    //@UseGuards(AuthGuard('jwt'))
    @Post('delete')
    async delete(@Body() params:any){
        return this.userService.delete(params);
    }

    //快速开户
    //@UseGuards(AuthGuard('jwt'))
    @Post('add')
    async add(@Body() params){

        var users = await this.userService.find(params);

        console.log(users.length);
        console.log('***************');
        
        if( users.length<=0 ){
            return await this.userService.add(params);
        }
        return '用户已存在';
    }

    //商户信息查询
    @Post('relationFind')
    async relationFind(@Body() Body){
        return await this.userService.relationFind(Body);
    }

    //商户信息的查询（涉及user（商户表）,mainCollection（主收款信息表）,account（银行卡表）的关联查询）
    @Post('queryUserInfo')
    async queryUserInfo(@Body() json) {

        const pageNum = Number(json.pageNum);
        const pageSize = Number(json.pageSize);

        if( !json.userNum && !json.userName && !json.mainCollectionNum && !json.cardId ) {
            return {};
        }

        if( !json.userNum ){
            json.userNum = '';
        }

        if( !json.userName ){
            json.userName = '';
        }

        if( !json.mainCollectionNum ){
            json.mainCollectionNum = '';
        }

        if( !json.uscardIderNum ){
            json.cardId = '';
        }

        var sortU = {};
        var userInfo = await this.userService.aggregate(pageNum, pageSize, sortU, json);

        var mainCard = null;

        //受理时间倒序
        var sortM = { actionTime : -1 };
        var record = await this.recordService.aggregate(pageNum, pageSize, sortM, json);

        return {
            'userInfo' : userInfo,
            'mainCard' : mainCard,
            'record' : record
        }


    }

    //修改密码
    @Post('updatePwd')
    async updatePwd(@Body() parmas){
        var json1 = { 'userNum' : parmas.userNum };
        var json2 = { 'password' : parmas.password };
        return await this.userService.update(json1,json2);
    }

    //绑定银行卡
    @Post('bindingCard')
    async bindingCard(@Body() body) {

        var json = { mainCollectionNum:body.mainCollectionNum };
        var array = await this.accountService.find(json);
        console.log(array.length);
        
        if( array.length<=0 ){
            return await this.accountService.add(body);   
        }

        return '该主收款账号已绑定银行卡';
    }

/////////////////////////////////测试用
    @Get('mq')
    mq(){
        return this.userService.mQuery();
    }

    @Post('mmq')
    mmq(@Query() body){

        return this.userService.manyMQuery(body);

    }

    //时间测试
    @Get('time')
    getTime(){
        var date = new Date().toLocaleTimeString();
        console.log( date );

        var sum = 0;
        for(var i=0 ; i<1000000 ;i++){
            sum += i;
        }

        var date1 = new Date().toLocaleTimeString();
        console.log( date1 );

        if( date1 > date){
            console.log('ok')
            return 'ok';
        }

        console.log('no');
        return 'no';
    }

    @Get('url')
    getUrl(@Request() req ){
        //console.log(req);
        console.log(req.url);
    }

    @Get('test')
    test(){
        
        var result = null;

        var result1 = [];

        console.log('result1: '+result1);
        console.log('result1: '+result1.length);
        
        try{
            console.log('result: '+result.length);
        } catch(error) {
            return  'error ';
        }

        console.log('test');
        return 'test';

    }

    @UseGuards(RoleAuthGuard)
    @Get('test1')
    test1(@Request() req){
         
        console.log(req.url);
        //console.log(req.baseUrl);

        console.log('test_1');
        return 'test_1';

    }
}
