import { Controller, Get, Post, Body, Param, UseGuards, Query ,Request} from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleAuthGuard } from 'src/guard/role-auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

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

        var user =await this.userService.findOne(params);

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

    //修改密码
    @Post('updatePwd')
    updatePwd(@Body() parmas){
        var json1 = { 'userNum' : parmas.userNum };
        var json2 = { 'password' : parmas.password };
        return this.userService.update(json1,json2);
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
