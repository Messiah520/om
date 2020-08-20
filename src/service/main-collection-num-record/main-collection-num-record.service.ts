import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MainCollectionInterface } from 'src/interface/mainCollection.interface';
import { MainCollectionRecordInterface } from 'src/interface/mainCollectionRecord.interface';

@Injectable()
export class MainCollectionNumRecordService {

    constructor(@InjectModel('MainCollectionNumRecord') private mainCollectionNumRecordModel){}

    getModel() {
        return this.mainCollectionNumRecordModel;
    }

    async add(json:MainCollectionRecordInterface) {
        try{
            var record = new this.mainCollectionNumRecordModel(json);
            return await record.save();
        } catch(error) {
            return null;
        }
    }

    async aggregate(pageNum, pageSize, sort, json:MainCollectionRecordInterface) {
        try{
            return await this.mainCollectionNumRecordModel.aggregate([
                {
                    $match : {
                        mainCollectionNum : { $regex : json.mainCollectionNum }
                    }
                },{
                    $limit: pageSize
                },{
                    $skip: (pageNum-1)*pageSize
                },{
                    $sort: sort
                }
            ]);
        } catch(error) {
            return null;
        }
    }

}
