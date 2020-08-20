import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EquipmentInterface } from 'src/interface/equipment.interface';
import { json } from 'express';

@Injectable()
export class EquipmentService {

    constructor(@InjectModel('Equipment') private readonly equipmentModel){}

    async add(json:EquipmentInterface){
        try{
            var equipment = new this.equipmentModel(json);
            return equipment.save();
        } catch(error){
            return null;
        }
    }

    async find(json:EquipmentInterface){
        try{
            return await this.equipmentModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async update(json1:EquipmentInterface,json2:EquipmentInterface){
        try{
            return await this.equipmentModel.updateOne(json1,json2);
        }catch(error){
            return null;
        }
    }

    async delete(josn:EquipmentInterface) {
        try{
            return await this.equipmentModel.delete(json);
        } catch(error){
            return null;
        }
    }

    async findByStatus(pageNum, pageSize, sort, json: EquipmentInterface) {
        try{
            return await this.equipmentModel.aggregate([

            ]);
        } catch(error) {
            return null;
        }
    }

    async findByDetails(pageNum, pageSize, sort, json: EquipmentInterface) {
        try{
            return await this.equipmentModel.aggregate([

            ]);
        } catch(error) {
            return null;
        }
    }
         
}
