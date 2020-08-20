import { Controller, Post, Body } from '@nestjs/common';
import { EquipmentService } from 'src/service/equipment/equipment.service';
import { json } from 'express';
import { EquipmentRecordService } from 'src/service/equipment-record/equipment-record.service';

@Controller('equipment')
export class EquipmentController {

    constructor(private readonly equipmentService:EquipmentService,
                private readonly equipmentRecodServie:EquipmentRecordService){}
    
    //设备绑定
    @Post('binding')
    async binding(@Body() params) {
        var json1 = { equipmentNum : params.equipmentNum };     //查询的条件
        var json2 = { mainCollectionNum : params.mainCollectionNum };    //修改的值
        return this.equipmentService.update(json1,json2);
    }

    //设备解绑
    @Post('unBinding')
    async unBinding(@Body() params) {
        var json1 = { equipmentNum : params.equipmentNum };     //查询的条件
        var json2 = { mainCollectionNum : null };    //修改的值
        return this.equipmentService.update(json1,json2);
    }

    //设备转送并生成转送记录
    @Post('transfer')
    async transfer(@Body() params){
        var json1 = { equipmentNum : params.equipmentNum };        //查询的条件
        var n = params.number+1;   //次数加一
        var json2 = { mainCollectionNum : params.mainCollectionNum, number : n };         //修改
        
        var result = await this.equipmentService.update(json1,json2);

        return {
            result: result
        }
    }

    //设备转送足迹
    @Post('transferFoot')
    async transferFoot(@Body() json) {

        const pageNum = Number(json.pageNum);
        const pageSize = Number(json.pageSize);

        //转送时间倒序
        var sort = { transferTime : -1 };

        if( !json.equipmentNum && !json.userNum && !json.startTime && !json.endTime ){
            return {};
        }
        if( !json.equipmentNum ) {
            json.equipmentNum = '';
        }
        if( !json.userNum ) {
            json.userNum = '';
        }

        var result = await this.equipmentRecodServie.aggregate(pageNum, pageSize, sort, json);
        return {
            result: result
        }
    }

    //设备状态
    @Post('status')
    async status(@Body() json) {
        
        var pageNum = Number(json.pageNum);
        var pageSize = Number(json.pageSize);

        var sort = { bindingTime : -1 };

        if( !json.equipmentNum && !json.userNum && !json.status ){
            return {};
        }
        if( !json.equipmentNum ) {
            json.equipmentNum = '';
        }
        if( !json.status ) {
            json.status = '';
        }
        var result = await this.equipmentService.findByStatus(pageNum, pageSize, sort, json);

        return {
            result: result
        }
    }

    //设备详情
    @Post('detail')
    async detail(@Body() json) {
        
        var pageNum = Number(json.pageNum);
        var pageSize = Number(json.pageSize);

        var sort = {};

        if( !json.equipmentNum && !json.userNum && !json.APPID && !json.IMEI ){
            return {};
        }
        if( !json.equipmentNum ) {
            json.equipmentNum = '';
        }
        if( !json.userNum ) {
            json.userNum = '';
        }
        var result = await this.equipmentService.findByDetails(pageNum, pageSize, sort, json);

        return {
            result: result
        }

    }

}
