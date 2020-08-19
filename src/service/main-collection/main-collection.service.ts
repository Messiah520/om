import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MainCollectionInterface } from 'src/interface/mainCollection.interface';
import { RelationUMAInterface } from 'src/interface/relationUMA.interface';

@Injectable()
export class MainCollectionService {

    constructor(@InjectModel('MainCollection') private readonly mainCollectionModel,
                @InjectModel('MainCollectionNumRecord') private readonly mainCollectionNumRecordModel){}

    async update(json1:MainCollectionInterface,json2:MainCollectionInterface){
        try{
            return await this.mainCollectionModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }

    //1：主收款账号如果随机生成，考虑使用单例模式来生成唯一主收款账号
    //2：或者生成前检查，是否已经存在，主收款账号
    async add(json:MainCollectionInterface){
        try{
            var mainCollection = new this.mainCollectionModel(json);
            return await mainCollection.save();
        } catch(error){
            return null;
        }
    }

    async relationFind(json:RelationUMAInterface){
        let result = await this.mainCollectionModel.aggregate([
            {
                $lookup:{
                    from:'user',            //关联的表
                    localField:'userNum',
                    foreignField:'userNum',
                    as:'result1'
                }
            },
            {
                $lookup:{
                    from:'account',            //关联的表
                    localField:'mainCollectionNum',
                    foreignField:'mainCollectionNum',
                    as:'result2'
                }
            },
            // {
            //     $match:{
            //         'userNum' : { $regex : json.userNum },
            //         'userName' : { $regex : json.userName },
            //         'mainCollectionNum' : { $regex : json.mainCollectionNum },
            //         'cardId' : { $regex : json.cardId }
            //     }
            // }
        ]);

        console.log(JSON.stringify(result));

        return {
            list:result
        };
    }

    getMainCollectionNumRecordModel(){
         return this.mainCollectionNumRecordModel;
    }

    //思考问题：mongoDB有级联删除吗
    getModel(){
        return this.mainCollectionModel;
    }

    async find(json:MainCollectionInterface) {
        try{
            return await this.mainCollectionModel.find(json).exec();
        } catch(error) {
            return null;
        }
    }

}
