import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { json } from 'express';

@Injectable()
export class CacheService {

    private client;

    constructor(private readonly redisService: RedisService){
        this.getClient();
    }
    
    async getClient() {
        this.client = await this.redisService.getClient();
    }

    //设置数据
    async set(key: string, value: any, seconds?: number) {       //value : any 设置为任何类型 因为下面json.stringfy(value),转换为相应字符串了

        value = JSON.stringify(value);  //统统转换为字符串
        if( !this.client ) {
            await this.getClient();
        }

        if( seconds ) {
            await this.client.set( key, value, 'EX', seconds);
        } else {
            await this.client.set( key, value );
        }
    }

    //获取数据
    async get(key : string) {

        if( !this.client ){     //因为 getClient是异步函数， 不一定能得到client 因此加以判断
            await this.getClient();
        }

        let data = await this.client.get(key);

        if(!data){
            return null;
        } else {
            return JSON.parse(data);        //JSON.parse()的作用
        }
    }


}
