import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { ManagerService } from 'src/service/manager/manager.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/service/auth/auth.service';
import { json } from 'express';

@Controller('manager')
export class ManagerController {

    constructor(private readonly managerService:ManagerService,
                private readonly authService:AuthService){}

    //登录
    /*
    运维人员登录后考虑把其权限列表添加到redis上，
    */
    @Post('login')
    async login(@Body() params:any){
        const manager = this.authService.validateManager(
            params.managerName,
            params.password,
            );
        if(manager){
            return this.authService.login(manager);     //获取token
        }
        return 'no token';
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('findAll')
    async findAll(){
        return this.managerService.findAll();
    }

    //注册添加运维人员
    @Post('register')
    async register(@Body() params){
        var json = {};
        var manager = this.managerService.find(params);
        if( !manager ){
            return '管理员已存在';
        }
        return this.managerService.add(params);
    }

    //查找当前运维人员的权限列表
    @Post('queryAccess')
    async queryAccess(@Body() body) {

        
    }

    //对运维人员添加权限列表
    @Post()
    async addAccess(@Body() body) {

    }

    //修改运维人员的权限
    //先删除他的所有权限，再增加
    @Post('update')
    async update(@Body() body) {

    }

}
