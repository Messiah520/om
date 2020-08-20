import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IntegratorInterface } from 'src/interface/integrator.interface';

@Injectable()
export class IntegratorService {

    constructor(@InjectModel('Integrator') private integratorModel){}

    async add(json:IntegratorInterface){

        try{
            var integrator = new this.integratorModel(json);
            return await integrator.save();
        } catch(error) {
            return null;
        }
    }

    async update(json1:IntegratorInterface, json2:IntegratorInterface){

        try{
            return await this.integratorModel.updateOne(json1,json2);
        } catch(error) {
            return null;
        }
    }

    async find(json:IntegratorInterface) {

        try{
            return await this.integratorModel.find(json).exec();
        } catch(error) {
            return null;
        }
    }

    async delete(json:IntegratorInterface) {

        try{
            return await this.integratorModel.deleteOne(json);
        } catch(error) {
            return null;
        }
    }

    async aggregate(json) {
        return await this.integratorModel.aggregate([
            {
                $match: {
                    $and: [
                        {
                            userNum: { $regex: json.integratorNum} 
                        },
                        {
                            userName: { $regex: json.integratorName }
                        }
                    ]
                }
            }
        ]);
    }

    
}
