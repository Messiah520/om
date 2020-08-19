import { Controller, Post, Body } from '@nestjs/common';
import { AppIdRecordService } from 'src/service/app-id-record/app-id-record.service';
import { json } from 'express';

@Controller('app-id-record')
export class AppIdRecordController {

    constructor(private readonly appIdRecordService: AppIdRecordService){}

    //生成转送记录
    @Post('addRecord')
    async addRecord(@Body() body) {

        return await this.appIdRecordService.addRecord(body);

    }

    //查找转送记录
    @Post('findRecord')
    async findRecord(@Body() body) {

        return await this.appIdRecordService.find(body);
    } 

    //appId的转送
    @Post('transfer')
    async transfer(@Body() body) {
        
    }

}
