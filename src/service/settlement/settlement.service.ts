import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { json } from 'express';

@Injectable()
export class SettlementService {

    constructor(@InjectModel('Settlement') private settlementModel){}

    async add(json) {

        try{
            var settlement = new this.settlementModel(json);
            return await settlement.save();
        } catch(error) {
            return null;
        }
    }

    async find(json) {
        try{
            return await this.settlementModel.find(json).exec();
        } catch(error) {
            return null;
        }
    }

    getModel(){

        return this.settlementModel;

    }
}
