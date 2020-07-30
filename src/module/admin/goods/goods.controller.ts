import { Controller, Body, Post, Param } from '@nestjs/common';
import { GoodsService } from 'src/service/goods/goods.service';

@Controller('goods')
export class GoodsController {

    constructor(private readonly goodsService:GoodsService){}

    //商品同步
    @Post('synchro')
    synchro(@Body() params) {
        return this.goodsService.update({},{});
    }

    //取消商品同步
    @Post('unSynchro')
    unSynchro(@Body() params) {
        return this.goodsService.update({},{});
    }

    //商品查询
    @Post('find')
    find(@Body() params) {
        return this.goodsService.find(params);
    }

    //新增商品
    @Post('add')
    add(@Body() params) {
        return this.goodsService.add(params);
    }

    //编辑商品
    @Post('edit')
    edit(@Body() params) {
        return this.goodsService.update({},{});
    }

    //商品通过审核
    @Post('passAudit')
    passAudit(@Body() params) {
        return this.goodsService.update({},{});
    }

    //商品拒绝审核
    @Post('passAudit')
    refuseAudit(@Body() params) {
        return this.goodsService.update({},{});
    }

    //商品重新审核
    @Post('passAudit')
    reAudit(@Body() params) {
        return this.goodsService.update({},{});
    }

    
}
