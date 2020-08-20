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

    //订单的支付查询
    async findByPayStatus(pageNum, pageSize, sort, json: OrderInterface) {

        try{
            return await this.orderModel.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                $regex: { shipmentStatus : json.shipmentStatus }
                            },
                            {
                                $regex: { equipmentNum : json.equipmentNum }
                            }, 
                            {
                                $regex: { payChannel : json.payChannel }
                            },
                            {
                                $regex: { orderNum : json.orderNum }
                            },
                            {
                                $regex: { app : json.app }
                            },
                            {
                                createTime : { $gte : json.startTime }
                            },
                            {
                                createTime : { $lte : json.endTime }
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
                    $sort:sort
                },
            ]);
        } catch(error) {
            return null;
        }
    }

    //订单的出货查询
    async findByShipment(pageNum, pageSize, sort, json: OrderInterface) {

        try{
            return await this.orderModel.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                $regex: { shipmentStatus : json.shipmentStatus }
                            },
                            {
                                $regex: { equipmentNum : json.equipmentNum }
                            }, 
                            {
                                $regex: { payChannel : json.payChannel }
                            },
                            {
                                $regex: { orderNum : json.orderNum }
                            },
                            {
                                $regex: { app : json.app }
                            },
                            {
                                createTime : { $gte : json.startTime }
                            },
                            {
                                createTime : { $lte : json.endTime }
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
                    $sort:sort
                },
            ]);
        } catch(error) {
            return null;
        }
    }

    //获取支付笔数
    async getPaymentNum() {

        try{
            return await this.orderModel.aggregate([
                {
                    $match: { payStatus : '成功' }
                },
                {
                    $group: { _id : "$payStatus" , total: { $sum: 1 } }
                }
            ]);
        } catch(error) {
            return null;
        }
    }

    //获取支付金额
    async getPaymentAmount() {
        try{
            return await this.orderModel.aggregate([
                {
                    $match: { payStatus : '成功' }
                },
                {
                    $group: { _id : "$payStatus" , total: {$sum: '$orderAmount'} }
                }
            ]);
        } catch(error) {
            return null;
        }
    }

    getModel() {
        return this.orderModel;
    }

}
