import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AccessService } from 'src/service/access/access.service';
import { access } from 'fs';

import * as mongoose from 'mongoose';
import { RoleAccessService } from 'src/service/role-access/role-access.service';

@Controller('access')
export class AccessController {

    constructor(private readonly accessService : AccessService,
                private readonly roleAccessService : RoleAccessService){}

    @Get()
    async index(){
        var result = await this.accessService.getModel().aggregate([
            {
                $lookup : {
                    from : 'access',
                    localField : '_id',
                    foreignField : 'module_id',
                    as : 'items'
                }
            },
            {
                $match: {
                    'module_id': '0'
                }
            }
        ]);
        console.log(JSON.stringify(result));
        return {
            list : result
        }
    }

    @Get('getModel')
    async getModel() {
        var result = await this.accessService.find({module_id : '0'});
        console.log(result);
        return {
            moduleList : result
        }
    }

    @Get('delete')
    async delete(@Query() query) {
        try{
            return await this.accessService.delete({_id : query._id});
        } catch(error) {
            return null;
        }
    }

    @Post('update')
    async update(@Query() query) {
        try{
            return await this.accessService.update({_id : query._id},query);
        } catch(error) {
            return null;
        }
    }

    @Post('doAdd')
    async doAdd(@Query() body) {
        var module_id = body.module_id;
        if( module_id != '0' ){     //判断模块的级别
            body.module_id = mongoose.Types.ObjectId(module_id);
        }
        return await this.accessService.add(body);
    }

    @Post('find')
    async findAll(){

        return await this.accessService.find({'url': '/user/test'});
    }

}
