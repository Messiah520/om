import { Controller, Get, Post, Body } from '@nestjs/common';
import { MainCollectionService } from 'src/service/main-collection/main-collection.service';
import { json } from 'express';
import { UserService } from 'src/service/user/user.service';
import { MainCollectionNumRecordService } from 'src/service/main-collection-num-record/main-collection-num-record.service';
import { constants } from 'buffer';
import { AccountService } from 'src/service/account/account.service';


@Controller('main-collection')
export class MainCollectionController {

    constructor(private readonly mainCollectionService:MainCollectionService,
                private readonly userService: UserService,
                private readonly mainCollectionRecordService: MainCollectionNumRecordService,
                private readonly accountService: AccountService){}
    
    //主收款记录的增加
    @Post('addRecord')
    async addRecord(@Body() body) {

        return await this.mainCollectionRecordService.add(body);
        
    }

    //新增主收款
    @Post('add')
    async add(@Body() params){
        var json = { 'mainCollectionNum' : params.mainCollectionNum };

        var mainCollection = await this.mainCollectionService.find(json);
        console.log(mainCollection);
        if( mainCollection.length>0 ){
            return 'mainCollection has on';
        }
        return this.mainCollectionService.add(params);
    }

    @Post('relationFind')
    relationFind(@Body() params){
        return this.mainCollectionService.relationFind(params);
    }

    //查询基本用户信息
    //主收款，及其对应的银行卡信息， 
    //主收款账号变更记录
    //支持多条件模糊查询
    @Post('relation')
    async relation(@Body() json) {

        //分页 上下页
        const pageNum = Number(json.pageNum);
        const pageSize = Number(json.pageSize);

        //如果全部为空 返回[] 
        //考虑空格值 
        if( !json.mainCollectionNum && json.userName 
            && json.cardId && json.userNum){
                return [];
        }

        if( !json.mainCollectionNum ){
            json.mainCollectionNum = '';
        }
        if( !json.userName ){
            json.userName = '';
        }
        if( !json.cardId ){
            json.cardId = '';
        }
        if( !json.userNum ){
            json.userNum = '';
        }

        //商户信息
        const user = await this.userService.getModel().aggregate([
            {
                $match: {
                    $and: [
                        {
                            userNum: { $regex: json.userNum} 
                        },
                        {
                            userName: { $regex: json.userName }
                        }
                    ]
                }
            },
        ]);

        //主收款，及其银行卡信息
        // const mainCollection = await this.mainCollectionService.getMainCollectionNumRecordModel().aggregate([
        //     {
        //         $match: {
        //             $and: [

        //             ]
        //         }
        //     },
        //     {
        //         $limit: pageSize
        //     },
        //     {
        //         $skip: (pageNum-1)*pageSize
        //     },
        //     {
        //         $sort: { 'actionTime' : -1}
        //     }
        // ]);

        const mainCollection1 = await this.accountService.getModel().aggregate([
            {
                $lookup: {
                    from: 'mainCollection',
                    localField: 'mainCollectionNum',
                    foreignField: 'mainCollectionNum',
                    as : 'items'
                }
            },
            {
                $match: {
                    $and: [
                        {
                            cardId : { $regex : json.cardId }
                        },
                        {
                            userNum : { $regex : json.userNum }
                        },
                        {
                            mainCollectionNum : { $regex : json.mainCollectionNum }
                        }
                    ]
                }
            }
        ]);


        //z账号变更信息
        const mainCollectionRecord = await this.mainCollectionRecordService.getModel().aggregate([
            {
                $match: {
                    $and: [
                        {
                            mainCollectionNum : { $regex : json.mainCollectionNum }
                        },
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
                $sort: { 'actionTime' : -1}
            }
        ])

        return {
            user: user,
            mainCollection: mainCollection1,
            mainCollectionRecord: mainCollectionRecord
        }

    }

    @Post()
    async find(){
        return await this.mainCollectionService.getModel().find().exec();

    }

    
}
