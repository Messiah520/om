import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('findAll')
    async findAll(){
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('delete')
    async delete(@Body() params:any){
        return this.userService.delete(params);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    async add(@Body() parmas:any){
        return this.userService.add(parmas);
    }
}
