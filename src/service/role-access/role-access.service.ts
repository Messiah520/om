import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleAccessService {

    constructor(@InjectModel('RoleAccess') private readonly roleAccessModel){}

    async find(json ) {
        try{
            return await this.roleAccessModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async add(json ) {
        try{
            var roleAccess = new this.roleAccessModel(json);
            return await roleAccess.save();
        } catch(error) {
            return null;
        }
    }

    async update(json1,json2) {
        try{
            return await this.roleAccessModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }

    async delete(json) {
        try{
            return await this.roleAccessModel.deleteOne(json);
        } catch(error) {
            return null;
        }
    }

    async deleteMany(json ) {
        try{
            return await this.roleAccessModel.deleteMany(json);
        } catch(error) {
            return null;
        }
    }

    async getModel(){
        return await this.roleAccessModel;
    }

    async findAll(){
        return await this.roleAccessModel.find().exec();
    }
}
