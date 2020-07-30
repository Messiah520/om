import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdvertisingInterface } from 'src/interface/advertising.interface';

@Injectable()
export class AdvertisingService {

    constructor(@InjectModel('Advertising') private advertisingModel){}

    async add(json:AdvertisingInterface) {
        try{
            var actvivtie = new this.advertisingModel(json);
            return await actvivtie.save();
        } catch(error){
            return null;
        }
    }

    async update(json1:AdvertisingInterface,json2:AdvertisingInterface){
        try{
            return await this.advertisingModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }

    async find(json:AdvertisingInterface){
        try{
            return await this.advertisingModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async delete(json:AdvertisingInterface) {
        try{
            return this.advertisingModel.delete(json);
        } catch(error){
            return null;
        }
    }
    
}
