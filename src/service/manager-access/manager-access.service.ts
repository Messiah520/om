import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ManagerAccessService {

    constructor(@InjectModel('ManagerAccess') private readonly managerAccessModel){}

    async add(json) {
        try{
            var managerAccess = new this.managerAccessModel(json);
            return await managerAccess.save();
        } catch(error) {
            return null;
        }
    }

    async delete(json) {
        try{
            return await this.managerAccessModel.deleteOne(json);
        } catch(error) {
            return null
        }
    }

    async find(json) {
        try{
            return await this.managerAccessModel.find(json).exec();
        } catch(error) {
            return null;
        }
    }
}
