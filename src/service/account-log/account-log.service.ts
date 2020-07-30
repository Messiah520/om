import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountLogInterface } from 'src/interface/accountLog.interface';

@Injectable()
export class AccountLogService {

    constructor(@InjectModel('AccountLog') private accountLogModel){}

    async add(json:AccountLogInterface){
        try{
            var accountLog = new this.accountLogModel(json);
            return await accountLog.save();
        } catch(error){
            return null;
        }
    }

    async findAll(json:AccountLogInterface){
        try{
            return await this.accountLogModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

}
