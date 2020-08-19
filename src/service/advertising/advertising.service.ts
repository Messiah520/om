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
            return await this.advertisingModel.find().exec();
        } catch(error){
            return null;
        }
    }

    async delete(json:AdvertisingInterface) {
        try{
            return await this.advertisingModel.deleteOne(json);
        } catch(error){
            return '删除失败';
        }
    }

    async aggregate(json:AdvertisingInterface) {
        var result = await this.advertisingModel.aggregate([
            {
                $match: {
                    startTime:{ $gte:json.startTime },
                    endTime:{ $lt:json.endTime }
                }
            }
        ]);
    }
    
}
