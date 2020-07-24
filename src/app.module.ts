import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AdminModule,
            MongooseModule.forRoot('mongodb://127.0.0.1:27017/om',{useNewUrlParser:true,connectionName:'om'})
            ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
