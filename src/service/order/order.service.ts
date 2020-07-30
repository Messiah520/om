import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderInterface } from 'src/interface/order.interface';

@Injectable()
export class OrderService {

    constructor(@InjectModel('Order') private orderModel){}

    async add(json:OrderInterface) {
        try{
            var order = new this.orderModel(json);
            return await order.save();
        } catch(error){
            return null;
        }
    }

    async find(json:OrderInterface) {
        try{
            return await this.orderModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    
    
}
