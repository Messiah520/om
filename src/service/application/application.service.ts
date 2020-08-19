import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationInterface } from 'src/interface/application.interface';
import { AppIdService } from '../app-id/app-id.service';

@Injectable()
export class ApplicationService {

    constructor(@InjectModel('Application') private applicationModel,
                private readonly appIdService: AppIdService){}

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
            return await this.applicationModel.find(json).exec();
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

    //生成根据APPCODE一定数量的appID
    //APPId的生成规则
    //生成一定数量的APPID后，其APPCODE对应的数量叠加
    async addMany(json:ApplicationInterface){

        for( var i=0; i<100; i++ ){
            await this.appIdService.add({});
        }

        await this.applicationModel.update({
            'APPCEDE': json.APPCODE
        },{
            $inc: { num: json.num }
        });
    }

    getModel() {
        return this.applicationModel;
    }

    

}
