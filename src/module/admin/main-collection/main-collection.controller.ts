import { Controller, Get, Post, Body } from '@nestjs/common';
import { MainCollectionService } from 'src/service/main-collection/main-collection.service';


@Controller('main-collection')
export class MainCollectionController {

    constructor(private readonly mainCollectionService:MainCollectionService){}

    @Post('add')
    async add(@Body() params:any){
        return this.mainCollectionService.add(params);
    }

    @Post('relationFind')
    relationFind(@Body() params){
        return this.mainCollectionService.relationFind(params);
    }

    
    
}
