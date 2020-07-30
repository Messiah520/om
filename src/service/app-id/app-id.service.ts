import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppIdInterface } from 'src/interface/appId.interface';

@Injectable()
export class AppIdService {

    constructor(@InjectModel('AppId') private appIdModel){}

    async add(json:AppIdInterface) {
        try{
            var appId = new this.appIdModel(json);
            return appId.save();
        } catch(error) {
            return null;
        }
    }

    async delete(json:AppIdInterface) {
        try{
            return this.appIdModel.delete(json);
        } catch(error){
            return null;
        }
    }

    async find(json:AppIdInterface) {
        try{
            return this.appIdModel.find(json).exec();
        } catch(error){
            return null;
        }
    }
    
    async update(json1:AppIdInterface,json2:AppIdInterface) {
        try{
            return this.appIdModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }

}
