import { Module } from '@nestjs/common';
import { ManagerController } from './manager/manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema } from 'src/schema/manager.schema';
import { ManagerService } from 'src/service/manager/manager.service';
import { UserController } from './user/user.controller';
import { UserSchema } from 'src/schema/user.schema';
import { UserService } from 'src/service/user/user.service';
import { AuthService } from 'src/service/auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth/constants';
import { AccountController } from './account/account.controller';
import { AccountService } from 'src/service/account/account.service';
import { MainCollectionController } from './main-collection/main-collection.controller';
import { MainCollectionService } from 'src/service/main-collection/main-collection.service';
import { MainCollectionSchema } from 'src/schema/mainCollection.schema';
import { EquipmentController } from './equipment/equipment.controller';
import { EquipmentService } from 'src/service/equipment/equipment.service';
import { OrderController } from './order/order.controller';
import { EquipmentSchema } from 'src/schema/equipment.schema';
import { OrderSchema } from 'src/schema/order.schema';
import { OrderService } from 'src/service/order/order.service';
import { AccountLogService } from 'src/service/account-log/account-log.service';
import { AccountLogSchema } from 'src/schema/accountLog.schema';
import { GoodsController } from './goods/goods.controller';
import { GoodsService } from 'src/service/goods/goods.service';
import { GoodsSchema } from 'src/schema/goods.schema';
import { AdvertisingController } from './advertising/advertising.controller';
import { AdvertisingService } from 'src/service/advertising/advertising.service';
import { AdvertisingSchema } from 'src/schema/advertising.schema';
import { ActivitieController } from './activitie/activitie.controller';
import { AccountSchema } from 'src/schema/account.schema';
import { ApplicationService } from 'src/service/application/application.service';
import { ApplicationSchema } from 'src/schema/appcation.schema';
import { ApplicationController } from './application/application.controller';
import { AppIdService } from 'src/service/app-id/app-id.service';
import { AppIdSchema } from 'src/schema/appId.schema';



@Module({
    imports:[MongooseModule.forFeature([{name:'Manager',schema:ManagerSchema,collection:"manager"}],'om'),
             MongooseModule.forFeature([{name:'User',schema:UserSchema,collection:"user"}],'om'),
             MongooseModule.forFeature([{name:'Account',schema:AccountSchema,collection:"account"}],'om'),
             MongooseModule.forFeature([{name:'MainCollection',schema:MainCollectionSchema,collection:"mainCollection"}],'om'),
             MongooseModule.forFeature([{name:'Equipment',schema:EquipmentSchema,collection:"equipment"}],'om'),
             MongooseModule.forFeature([{name:'Order',schema:OrderSchema,collection:"order"}],'om'),
             MongooseModule.forFeature([{name:'AccountLog',schema:AccountLogSchema,collection:"accountLog"}],'om'),
             MongooseModule.forFeature([{name:'Goods',schema:GoodsSchema,collection:"goods"}],'om'),
             MongooseModule.forFeature([{name:'Advertising',schema:AdvertisingSchema,collection:"advertising"}],'om'),
             MongooseModule.forFeature([{name:'Application',schema:ApplicationSchema,collection:"application"}],'om'),
             MongooseModule.forFeature([{name:'AppId',schema:AppIdSchema,collection:"appId"}],'om'),

             PassportModule,
             JwtModule.register({
                secret:jwtConstants.secret,
                signOptions:{ expiresIn: '1000s' },
             })
            ],
    controllers: [ManagerController, UserController, AuthController, AccountController, MainCollectionController, EquipmentController, OrderController, GoodsController, AdvertisingController, ActivitieController, ApplicationController],
    providers:[ManagerService, UserService, AdvertisingService, GoodsService, AppIdService, MainCollectionService, ApplicationService, AuthService, AccountService, EquipmentService, OrderService, AccountLogService, JwtStrategy, LocalStrategy],
})
export class AdminModule {}UserSchema
