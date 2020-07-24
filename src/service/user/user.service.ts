import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from 'src/interface/schema.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel){}

    async add(json:UserInterface){
        try{
            var manager = this.userModel(json);
            return await manager.save();
        } catch(error){
            return null;
        }
    }

    async findAll(){
        try{
            return await this.userModel.find().exec();
        } catch(error){
            return null;
        }
    }

    async delete(json:UserInterface){
        try{
            return await this.userModel.deleteOne(json);
        } catch(error){
            return null;
        }
    }

}
