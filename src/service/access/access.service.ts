import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccessInterface } from 'src/interface/access.interface';

@Injectable()
export class AccessService {

    constructor(@InjectModel('Access') private accessModel){}

    /*
    增加模块的时候，是否选择父模块
    0 表示顶级模块
    */
    async add(json : AccessInterface) {
        try{
            var access = new this.accessModel(json);
            return await access.save();
        } catch(error) {
            return [];
        }
    }

    //只修改模块名称
    async update(json1 : AccessInterface, json2 : AccessInterface) {
        try{
            return await this.accessModel.updateOne(json1,json2);
        } catch (error){
            return null;
        }
    }

    //如果是删除 ‘顶级模块’ 考虑是否删除所有的子模块
    async delete(json : AccessInterface) {
        try{
            return await this.accessModel.deleteOne({_id : json._id});
        } catch(error){
            return null;
        }
    }

    async find(json : AccessInterface) {
        try{
            return this.accessModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    //获取accessModel
    getModel() {
        return this.accessModel;
    }

}
