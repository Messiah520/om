import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppIdRecordInterface } from 'src/interface/appIdRecord.interface';

@Injectable()
export class AppIdRecordService {

    constructor(@InjectModel('AppIdRecord') private readonly appIdRecordModel){}

    async addRecord(json: AppIdRecordInterface) {

        try{
            var record = new this.appIdRecordModel(json);
            return await record.save();
        } catch(error) {
            return null;
        }

    }

    async find(json: AppIdRecordInterface){

        try{
            return await this.appIdRecordModel.find(json).exec();
        } catch(error) {
            return [];
        }
    }

    //appid转送记录
    async aggregate(pageNum, pageSize, sort, json:AppIdRecordInterface) {

        try{
            return await this.appIdRecordModel.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                $regex: { appName: json.appName }
                            },
                            {
                                $regex: { APPCODE: json.APPCODE }
                            },
                            {
                                $regex: { targetAccount: json.targetAccount }
                            },
                            {
                                transferTime : { $get : json.startTime }
                            },
                            {
                                transferTime : { $let : json.endTime }
                            }
                        ]
                    }
                },
                {
                    $limit: pageSize
                },
                {
                    $skip: (pageNum-1)*pageSize
                },
                {
                    $sort: sort
                }
            ]);
        } catch(error) {
            return null;
        }
    }

    getModel() {
        return  this.appIdRecordModel;
    }



}
