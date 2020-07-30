import { Controller, Post, Body } from '@nestjs/common';
import { AdvertisingService } from 'src/service/advertising/advertising.service';

@Controller('activitie')
export class ActivitieController {

    constructor(private readonly activiteService:AdvertisingService){}

    //新增营销活动
    @Post('add')
    add(@Body() params) {
        var json = { 'startTiem':params.startTiem,'endTime':params.endTime };
        var array = this.activiteService.find(json);
        if(array != null){
            return null;
        }
        return this.activiteService.add(params);
    }

    //修改营销活动
    @Post('update')
    update(@Body() params) {
        var json = { 'startTiem':params.startTiem,'endTime':params.endTime };
        var array = this.activiteService.find(json);
        if( array != null ){
            return null;
        }
        var json2 = {};     //营销活动id
        return this.activiteService.update(json2,params);
    }

    //删除营销活动
    @Post('delete')
    delete(@Body() params) {
        return this.activiteService.delete(params);
    }

    //上架营销活动
    @Post('onShelf')
    onShelf(@Body() params) {
        var json = {};      //状态修改为‘上架’
        return this.activiteService.update(params,json);
    }

    //下架营销活动
    @Post('offShelf')
    offShelf(@Body() params) {
        var json = {};      //状态修改为‘下架’
        return this.activiteService.update(params,json);
    }

    
}
