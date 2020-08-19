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

    //多条件模糊查询
    async fuzzyQuery(json: OrderInterface ){

        if( !json.payStatus ){
            json.payStatus = '';
        }
        if( !json.payChannel ){
            json.payChannel = ';'
        }
        if( !json.equipmentNum ){
            json.equipmentNum = '';
        }
        
        try{
            return await this.orderModel.aggregate([
                {
                    $match : {
                        $and : [
                            {
                                payStatus : { $regex : json.payStatus }
                            },
                            {
                                equipmentNum : { $regex : json.equipmentNum }
                            },
                            {
                                payChannel : { $regex : json.payChannel }
                            },
                            {
                                orderNum : { $regex : json.orderNum }
                            },
                            {
                                app : { $regex : json.app }
                            },
                            {
                                createTime : { $gte : json.startTime }
                            },
                            {
                                createTime : { $lte : json.endTime }
                            }
                        ]
                    }
                },{
                    $project: { _v:0}
                },{
                    $sort : { createTime : -1 }
                }
            ]);
        } catch(error) {
            return [];
        }
    }

    getModel() {
        return this.orderModel;
    }

    
    
}
