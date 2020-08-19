import { Controller, Post, Body } from '@nestjs/common';
import { AdvertisingService } from 'src/service/advertising/advertising.service';
import { start } from 'repl';

@Controller('advertising')
export class AdvertisingController {

    constructor(private readonly advertisingService:AdvertisingService){}

    //新增广告
    @Post('add')
    async add(@Body() params) {
        // var json = { startTime:params.startTime,endTiem:params.endTiem };
        // var array = this.advertisingService.find(json);
        // if( !array ){
        //     return null;
        // }
        var json = { startTime:params.startTime,endTiem:params.endTiem };
        var result = this.advertisingService.aggregate(json);
        if( !result ){
            return '此时间段已存在广告';
        }
        return this.advertisingService.add(params);
    }

    //删除广告
    @Post('delete')
    async delete(@Body() params) {
        return this.advertisingService.delete(params);
    }

    //修改广告
    @Post('update') 
    update(@Body() params) {
        var json = { startTime:params.startTime,endTime:params.endTime};
        var array = this.advertisingService.find(json);
        if( array != null ){
            return null;
        }
        return this.advertisingService.update({},{});
    }

    //查询广告
    @Post('find')
    find(@Body() params) {
        return this.advertisingService.find(params);
    }

    //上架广告
    @Post('onShelf')
    onShelf(@Body() params) {
        var json1 = { };                        //查询条件
        var josn2 = { status : '上架' };        //修改
        return this.advertisingService.update(params,josn2);
    }

    //下架广告
    @Post('offShelf')
    offShelf(@Body() params) {
        var json1 = { };
        var josn2 = { status : '下架' };
        return this.advertisingService.update(json1,josn2);
    }

    
}
