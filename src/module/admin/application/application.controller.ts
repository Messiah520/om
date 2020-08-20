import { Controller, Post, Body } from '@nestjs/common';
import { ApplicationService } from 'src/service/application/application.service';
import { AppIdService } from 'src/service/app-id/app-id.service';

@Controller('application')
export class ApplicationController {

    constructor(private readonly applicationService:ApplicationService,
                private readonly appIdService:AppIdService){}

    //新增应用
    @Post('addAPPCODE')
    async addAPPCODE(@Body() params){
        var json = { APPCODE : params.APPCODE };
        var appCode = await this.applicationService.find(json);
        console.log(appCode.length);

        if( appCode.length <= 0 ){
            return this.applicationService.add(params);
        }
        //return this.applicationService.add(params);
        return 'appCode已经存在';
    }

    //批量生成appid，前提appcode已存在
    @Post('addAppId')
    async addAppId(@Body() params) {

        //引入uuid
        var uuid = require('node-uuid');

        var json = { APPCODE : params.APPCODE };
        var appCode = this.appIdService.find(json);
        var n = params.number;
        if( appCode ){
            for( var i = 0 ; i < n ; i++ ){
                this.appIdService.add({ APPID : uuid.v1(), APPCODE : params.APPCODE });
            }
            return '创建成功';
        }
        return 'appcode 不存在';

    }

    //删除appid
    @Post('deleteAppId')
    async deleteAppId(@Body() params){
        return this.appIdService.delete(params);
    }

    //批量删除appid
    @Post('deleteAppIds')
    async deleteAppIds(@Body() params){
        
    }

    

}
