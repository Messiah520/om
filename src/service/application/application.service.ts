import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationInterface } from 'src/interface/application.interface';

@Injectable()
export class ApplicationService {

    constructor(@InjectModel('Application') private applicationModel){}

    async add(json:ApplicationInterface) {
        try{
            var application = new this.applicationModel(json);
            return await application.save();
        } catch(error){
            return null;
        }
    }

    async find(json:ApplicationInterface) {
        try{
            return this.applicationModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async update(json1:ApplicationInterface,json2:ApplicationInterface) {
        try{
            return this.applicationModel.updateOne(json1,json2)
        } catch(error) {
            return null;
        }
    }

    async delete(json:ApplicationInterface) {
        try{
            return this.applicationModel.delete(json);
        } catch(error) {
            return null;
        }
    }

}
