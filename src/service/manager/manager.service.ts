import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ManagerInterface } from 'src/interface/manager.interface';
import { ManagerAccessService } from '../manager-access/manager-access.service';
import { AccessService } from '../access/access.service';

@Injectable()
export class ManagerService {

    constructor(@InjectModel('Manager') private readonly managerModel,
                private readonly managerAccessService: ManagerAccessService,
                private readonly accessService: AccessService,
                ){}

    async findAll() {
        try{
            return await this.managerModel.find().exec();
        } catch(error){
            return null;
        }
    }

    async findByNameAndPassword(json:ManagerInterface) {
        try{
            return await this.managerModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async add(json:ManagerInterface) {
        try{
            var manager = this.managerModel(json);
            return await manager.save();
        } catch(error){
            return null;
        }
    }

    async find(json:ManagerInterface) {
        try{
            return this.managerModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    //判断用户是否有权限访问路由地址
    async checkAuth(req) {

        /**
         * 1：获取当前用户访问的路由地址
         * 2：找到该路由地址对应的权限id
         * 3：找到当前运维人员的权限列表id
         * 4：循环遍历判断
         */
        var pathname = req.url;

        var access = await this.accessService.find({url: pathname});

        var manager = req.session.manager;
        var manager_id = manager._id;


        //找到当前运维人员对应的权限列表access_id
        var accessResult = await this.managerAccessService.find({manager_id : manager_id});

        var accessArray = [];
        accessResult.forEach(element => {
            accessArray.push(element.access_id.toString());
        });

        console.log(accessArray);

        if( access.length>0 ){

            if( accessArray.indexOf(access[0]._id.toString()) != -1){
                return true;
            } else{
                return false;
            }
        } else {
            return false;
        }




    }
}
