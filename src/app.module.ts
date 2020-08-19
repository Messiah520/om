import { Module, MiddlewareConsumer, NestModule, Options } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from 'nestjs-redis';
import { Config } from 'src/config/config'
import { ManagerAccessService } from './service/manager-access/manager-access.service';

@Module({
  imports: [AdminModule,
            MongooseModule.forRoot('mongodb://127.0.0.1:27017/om',{useNewUrlParser:true,connectionName:'om'}),
            RedisModule.register(Config.redisOptions),    //这里相当于暴露了RedisService,因此
            ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {

  //配置权限验证的中间件
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(RoleAuthMiddleware)
  //     .forRoutes('*');
  // }

}
