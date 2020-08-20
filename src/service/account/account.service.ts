import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountInterface } from 'src/interface/account.interface';

@Injectable()
export class AccountService {

    constructor(@InjectModel('Account') private readonly accountModel){}

    
    async add(json:AccountInterface) {
        try{
            var account = new this.accountModel(json);
            return await account.save();
        } catch(error){
            return null;
        }
    }

    //
    async find(json:AccountInterface) {
        try{
            return await this.accountModel.findOne(json).exec();
        } catch(error){
            return null;
        }
    }

    async findAll(json:AccountInterface) {
        try{
            return await this.accountModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async update(json1:AccountInterface, json2:AccountInterface) {
        try{
            return await this.accountModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }

    //多条件 模糊分页查询
    async aggregate(pageNum,pageSize,sort,json: AccountInterface) {

        try{
            return await this.accountModel.aggregate([
                {
                    $match:{
                        $and: [
                            {
                                cardId: { $regex: json.cardId}
                            },
                            {
                                status: { $regex: json.status}
                            },
                            {
                                auditSubmitTime : { $gte : 0 }
                            },
                            {
                                auditSubmitTime : { $lte : 100 }
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
            ])
        }catch(error) {
            return null;
        }
    }

    getModel(){
        return this.accountModel;
    }

    async relationMian(json) {
        try{
            return await this.accountModel.aggregate([
                {
                    $lookup: {
                        from : '',
                        localField : '',
                        foreignField : '',
                        as : 'items'
                    }
                },
                {
                    $match: {
                        $and: [
                            {
                                cardId : { $regex: json.cardId }
                            }
                        ]
                    }
                }
            ]);

        } catch(error){
            return null;
        }
    }

}
