import { Controller, Post, Query, Body, Get ,Request } from '@nestjs/common';
import { RoleService } from 'src/service/role/role.service';
import { json, query } from 'express';
import { RoleAccessService } from 'src/service/role-access/role-access.service';
import { AccessService } from 'src/service/access/access.service';
import { access } from 'fs';

@Controller('role')
export class RoleController {

    constructor(private readonly roleService : RoleService,
                private readonly roleAccessService : RoleAccessService,
                private readonly accessService : AccessService){}

    @Post('add')
    async add(@Query() body) {
        
        var role = await this.roleService.find(body);

        // console.log(role == null);
        // console.log(role == undefined);
        // console.log(role.length);

        // if( role.length <= 0 ){
        //     return await this.roleService.add(body);
        // }
        // return 'role has on';

        return await this.roleService.add(body);
    }

    @Post('find')
    async find(@Query() body) {

        var result = await this.roleService.find(body);

        return {
            list : result
        }
    }

    @Post('update')
    async update(@Body() body) {

        var result = await this.roleService.update({ "_id" : body._id }, body);

        return result;
    }

    @Post('delete')
    async delete(@Query() body) {
        
        return await this.roleService.delete({"_id" : body._id});

    }

    @Get('findAll')
    async findAll(){
        return await this.roleService.find({});
    }
    
    //根据role的权限动态显示菜单栏
    @Get('auth')
    async auth(@Query() query) {
        //
        var role_id = query._id;

        var result = await this.accessService.getModel().aggregate([
            {
                $lookup: {
                    from: 'access',
                    loaclField: '_id',
                    foreignField: 'module_id',
                    as: 'items'
                }
            },
            {
                $match: {
                    'module': '0'
                }
            }
        ]);

        //2,查询当前角色拥有的权限
        var accessResult = await this.roleAccessService.find({'role_id':role_id});
        
        var roleAccessArray = [];
        accessResult.forEach(element => {
            roleAccessArray.push(element.access_id.toString());
        });

        console.log(roleAccessArray);

        //3

        for( var i=0;i<result.length;i++ ){

            if(roleAccessArray.indexOf(result[i]._id.toString()) != -1){
                result[i].checked = true;
            }

            for( var j=0;j<result[j].items.length;j++ ){
                if(roleAccessArray.indexOf(result[i].items[j]._id.toString()) != -1){
                    result[i].items[j].checked = true;
                }
            }
        }

        return {
            list : result,
            role_id : role_id
        }
    }

    //修改当前角色的权限
    @Post('doAuth')
    async adAuth(@Body() body) {
        console.log(body);

        var role_id = body.role_id;

        //body传入一个accessArray数组
        var accessAarry = body.accessAarry;

        //1.删除当前角色的所有权限
        this.roleAccessService.deleteMany({'role_id' : role_id});

        //2.把当前角色对应的所有权限增加到role_access表里面
        for( var i=0;i<accessAarry.length;i++ ){
            this.roleAccessService.add({
                'role_id':role_id,
                'access_id':accessAarry[i]
            });
        }
    }

    //角色与权限的关联
    @Post('role_access')
    async role_access(@Body() body) {

        return await this.roleAccessService.add(body);

    }

    //查找当前角色所拥有的 所有权限
    @Post('queryAccessByRole')
    async queryAccessByRole(@Body() body){

        var result = await this.roleAccessService.find({'role_id' : body.role_id});

        console.log(result);

        return result;
    }

    @Get('getAll')
    async get(){
        return await this.roleAccessService.findAll();
    }


    @Post('login')
    async login(@Body() body,@Request() req) {

        var role = await this.roleService.find(body);

        console.log(role);
        if( role ){
            req.session.role = role[0];
        }

        return 'set session';
    }

    @Get('getSession')
    getSession(@Request() req){

        console.log(req.session.role);
        return 'get';
    }
}
