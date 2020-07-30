import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ManagerInterface } from 'src/interface/manager.interface';

@Injectable()
export class ManagerService {

    constructor(@InjectModel('Manager') private readonly managerModel){}

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
}
