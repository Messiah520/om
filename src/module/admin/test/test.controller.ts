import { Controller, Get } from '@nestjs/common';
import { CacheService } from 'src/service/cache/cache.service';
import { TestService } from 'src/service/test/test.service';

@Controller('test')
export class TestController {

    constructor(private cacheService : CacheService,
                private testService : TestService
        ){}

    @Get()
    async index(){

        await this.cacheService.set('user', 'messi');

        console.log(123);

        var result = await this.cacheService.get('userinfo');

        console.log(result);

        return result;

    }

    @Get('demo')
    async demo() {
        
        await this.cacheService.set('key', {
            'name' : 'messi',
            age : 32
        });

    }
}
