import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from 'src/interface/user.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel){}

    //用户注册
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

    async findOne(json:UserInterface){
        try{
            return await this.userModel.findOne(json);
        } catch(error){
            return null;
        }
    }

    //
    async relationFind(){
        let result = await this.userModel.aggregate([
            {
                $lookup:{
                    from:'mainCollection',
                    localField:'userNum',
                    foreignField:'userNum',
                    as:'items'
                }
            },
            // {
            //     $match:{'':{}}      //查询条件
            // }
        ]);
        
        console.log(JSON.stringify(result));
        
        return {
            list:result
        };
    }

    async update(json1:UserInterface,json2:UserInterface) {
        try{
            var result = await this.userModel.updateOne(json1,json2);
            return result;
        } catch(error){
            return null;
        }
    }

    

}
