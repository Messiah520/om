import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { ManagerService } from 'src/service/manager/manager.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('manager')
export class ManagerController {

    constructor(private readonly managerService:ManagerService,
                private readonly authService:AuthService){}

    //登录
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

    @Post('add')
    async add(@Body() params:any){
        return this.managerService.add(params);
    }

}
