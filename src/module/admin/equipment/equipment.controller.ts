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
    binding(@Body() params) {
        var json1 = { equipmentNum : params.equipmentNum };     //查询的条件
        var json2 = { mainCollectionNum : params.mainCollectionNum };    //修改的值
        return this.equipmentService.update(json1,json2);
    }

    //设备解绑
    @Post('unBinding')
    unBinding(@Body() params) {
        var json1 = { equipmentNum : params.equipmentNum };     //查询的条件
        var json2 = { mainCollectionNum : null };    //修改的值
        return this.equipmentService.update(json1,json2);
    }

    //设备转送
    @Post('transfer')
    transfer(@Body() params){
        var json1 = { equipmentNum : params.equipmentNum };        //查询的条件
        var n = params.number+1;   //次数加一
        var json2 = { mainCollectionNum : params.mainCollectionNum, number : n };         //修改
        return this.equipmentService.update(json1,json2);
    }

    //设备转送足迹
    @Post('transferFoot')
    transferFoot(@Body() params) {
        return this.equipmentService.find(params);
    }

    //设备状态
    @Post('status')
    status(@Body() params) {
        return this.equipmentService.find(params);
    }

    //设备详情
    @Post('detail')
    detail(@Body() params) {
        return this.equipmentService.find(params);
    }

    //查看设备转送足迹
    @Post('transferRecord')
    async transferRecord(@Body() json) {

        const pageNum = Number(json.Number);
        const pageSize = Number(json.pageSize);

        const result = await this.equipmentRecodServie.getModel().aggregate([
            {
                $match: {
                    $and: [

                    ]
                }
            },
            {

            }
        ]);

        return result;
    }
    

}
