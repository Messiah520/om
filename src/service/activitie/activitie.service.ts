import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivitieInterface } from 'src/interface/activitie.interface';

@Injectable()
export class ActivitieService {

    constructor(@InjectModel('Activitie') private activitieModel){}

    async add(json:ActivitieInterface) {
        try{
            var activitie = new this.activitieModel(json);
            return await activitie.save()
        } catch(error){
            return null;
        }
    }

    async find(json:ActivitieInterface) {
        try{
            return await this.activitieModel.find(json).exec();
        } catch(error){
            return null;
        }
    }

    async update(json1:ActivitieInterface,json2:ActivitieInterface) {
        try{
            return this.activitieModel.updateOne(json1,json2);
        } catch(error){
            return null;
        }
    }

    async delete(json:ActivitieInterface) {
        try{
            return this.activitieModel.delete(json);
        } catch(error){
            return null;
        }
    }
}
