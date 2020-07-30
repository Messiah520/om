import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountInterface } from 'src/interface/account.interface';

@Injectable()
export class AccountService {

    constructor(@InjectModel('Account') private readonly accountModel){}

    //添加银行卡
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


    //审核通过
    async auditPass(json1:AccountInterface,json2:AccountInterface) {
        try{
            return await this.accountModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }

    //统计
    async count(json:AccountInterface) {
        try{

        } catch(error){
            return null;
        }
    }


}
