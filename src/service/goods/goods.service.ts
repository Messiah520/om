import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsInterface } from 'src/interface/Goods.interface';

@Injectable()
export class GoodsService {

    constructor(@InjectModel('Goods') private goodsModel){}

    async add(json:GoodsInterface) {
        try{
            var commonGoods = new this.goodsModel(json);
            return commonGoods.save();
        } catch(error){
            return null;
        }
    }
    
    async find(json:GoodsInterface) {
        try{
            return this.goodsModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async update(json1:GoodsInterface,json2:GoodsInterface) {
        try{
            return this.goodsModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }
    
}
