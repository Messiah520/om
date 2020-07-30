import { Controller, Post, Body } from '@nestjs/common';
import { AdvertisingService } from 'src/service/advertising/advertising.service';
import { start } from 'repl';

@Controller('advertising')
export class AdvertisingController {

    constructor(private readonly advertisingService:AdvertisingService){}

    //新增广告
    @Post('add')
    add(@Body() params) {
        var json = { startTime:params.startTime,endTiem:params.endTiem };
        var array = this.advertisingService.find(json);
        if( array != null ){
            return null;
        }
        return this.advertisingService.add(params);
    }

    //删除广告
    @Post('delete')
    delete(@Body() params) {
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
        var json1 = { };
        var josn2 = { };
        return this.advertisingService.update(json1,josn2);
    }

    //下架广告
    @Post('offShelf')
    offShelf(@Body() params) {
        var json1 = { };
        var josn2 = { };
        return this.advertisingService.update(json1,josn2);
    }

    
}
