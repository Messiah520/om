import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class TestService {

    public client;

    constructor(private redsiService: RedisService) {
        this.getClient(); 
    }

    async getClient() {
        this.client = await this.redsiService.getClient();
    }
}
