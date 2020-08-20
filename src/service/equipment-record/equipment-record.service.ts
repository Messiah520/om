import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EquipmentRecordInterface } from 'src/interface/equipmentRecord.interface'

@Injectable()
export class EquipmentRecordService {

    constructor(@InjectModel('EquipmentRecord') private equipmentRecordModel){}

    getModel() {
        return this.equipmentRecordModel;
        
    }


    async aggregate(pageNum, pageSize, sort, json: EquipmentRecordInterface) {

        try{

            return await this.equipmentRecordModel.aggregate([
                {
                    $match: {
                        $and: [

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
            ]);
            
        } catch(error) {
            return null;
        }
    }

}
