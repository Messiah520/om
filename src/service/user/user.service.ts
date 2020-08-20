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

    async find(json:UserInterface) {
        try{
            return await this.userModel.find(json).exec();
        }catch(error) {
            return null;
        }
    }

    //多条件模糊分页查询查询
    async aggregate(pageNum, pageSize, sort, json:UserInterface) {

        try{
            return await this.userModel.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                $regex: { userNum: json.userNum }
                            },
                            {
                                $regex : { userName: json.userName }
                            }
                        ]
                    }
                },
                {
                    $limit: pageSize
                },
                {
                    $skip: (pageNum-1)*pageSize
                }
            ]);

        }catch(error) {
            return null;
        }

    }

    //用户-主收款-银行卡号
    async relationFind(json){

        //条件的过滤
        if( !json.userNum ){        //账户
            json.userNum = '';
        }
        if( !json.mainCollection ){     //主收款号
            json.mainCollection = '';
        }
        if( !json.cardId ){        //银行卡号
            json.cardId = '';
        }
        if( json.userName ){       //商户名
            json.userName = '';
        }

        //多表 多条件的模糊查询
        let result = await this.userModel.aggregate([
            {
                // $lookup:{
                //     from:'mainCollection',
                //     localField:'userNum',
                //     foreignField:'userNum',
                //     as:'items'
                // }
                $lookup : [
                    {
                        from:'mainCollection',
                        localField:'userNum',
                        foreignField:'userNum',
                        as:'items'
                    },{
                        from:'mainCollection',
                        localField:'userNum',
                        foreignField:'userNum',
                        as:'items'
                    }
                ]
                
            },{
                $match : {      //多条件模糊查询
                    $and : [        
                        {
                            userNum : { $regex : json.userNum }
                        },{
                            mainCollection : { $regex : json.mainCollection }
                        },{
                            cardId : { $regex : json.cardId }
                        },{
                            userName : { $regex : json.userName }
                        }
                    ]
                }
            },{
                //$sort:    //排序
                $limit:10   //分页
            }
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

    async mQuery() {

        var result = this.userModel.aggregate([
            {
                $match : {userName:{$regex:'e'}}
            },{
                $limit:2
            }
        ]);

        return result;
    }


    //多条件模糊查询
    //$regex has to be a string  $regex只能匹配字符串
    //如何转换为字符串
    async manyMQuery(json:UserInterface) {
        
        //过滤json的数据
        console.log(json.password);

        if( !json.password ){
            json.password = 'as';
        }

        console.log(json.password);

        var result = this.userModel.aggregate([
            {
                $match : {
                    $and : [
                        {
                            userName : {$regex : json.userName}
                        },
                        // {
                        //     password : {$regex : ''}
                        // }
                    ]
                }
            },{
                $limit:10
            }
        ]);

        return result;
    }


    getModel(){
        return this.userModel;
    }
}
