import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleInterface } from 'src/interface/role.interface';
import { from } from 'rxjs';
import { RoleAccessService } from '../role-access/role-access.service';
import { AccessService } from '../access/access.service';

@Injectable()
export class RoleService {

    constructor(@InjectModel('Role') private readonly roleModel,
                private readonly roleAccessService : RoleAccessService,
                private readonly accessService : AccessService){}

    async add(json : RoleInterface) {
        try{
            var role = new this.roleModel(json);
            return await role.save()
        } catch(error){
            return null;
        }
    }

    async find(json : RoleInterface) {
        try{
            return await this.roleModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async delete(json : RoleInterface) {
        try{
            return await this.roleModel.deleteOne(json);
        } catch(error) {
            return null;
        }
    }

    async update(json1 : RoleInterface, json2 : RoleInterface ){
        try{
            return await this.roleModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }

    async checkAuth(req) {
        /*
          1、获取当前用户的角色    （如果超级管理员跳过权限判断 is_super=1）
          2、根据角色获取当前角色的权限列表                       
          3、获取当前访问的url 对应的权限id
          4、判断当前访问的url对应的权限id 是否在权限列表中的id中
      */
        //1.获取当前的用户角色
        //var pathname : string = req.baseUrl;

        //获取当前访问的地址
        var pathname : string = req.url;

        var role = req.session.role;

        console.log(role);

        var role_id = role._id;

        //2.根据角色获取当前角色的权限列表
        var accessResult = await this.roleAccessService.find({'role_id':role_id});

        var accessArray = [];
        accessResult.forEach(element => {
            accessArray.push(element.access_id.toString());
        });
        
        console.log(accessArray);
        
        //3.获取当前访问url对应权限id
        var access = await this.accessService.find({'url':pathname});
        if( access.length > 0 ){
            //4.判断当前访问url对应权限id 是否存在权限列表id中
            if(accessArray.indexOf(access[0]._id.toString()) != -1){
                return true;
            } else{
                return false;
            }
        }else{
            return false;
        }
    }
    
}
