import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EquipmentRecordService {

    constructor(@InjectModel('EquipmentRecord') private equipmentRecordModel){}

    getModel() {
        return this.equipmentRecordModel;
        
    }

}
