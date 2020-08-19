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
import { ApplicationSchema } from 'src/schema/application.schema';
import { ApplicationController } from './application/application.controller';
import { AppIdService } from 'src/service/app-id/app-id.service';
import { AppIdSchema } from 'src/schema/appId.schema';
import { RoleController } from './role/role.controller';
import { RoleService } from 'src/service/role/role.service';
import { RoleSchema } from 'src/schema/role.schema';
import { AccessController } from './access/access.controller';
import { AccessSchema } from 'src/schema/access.schema';
import { AccessService } from 'src/service/access/access.service';
import { RoleAccessSchema } from 'src/schema/role_access.schema';
import { RoleAccessService } from 'src/service/role-access/role-access.service';
import { AppIdRecordController } from './app-id-record/app-id-record.controller';
import { AppIdRecordService } from 'src/service/app-id-record/app-id-record.service';
import { AppIdRecordSchema } from 'src/schema/appIdRecord.schema';
import { IntegratorController } from './integrator/integrator.controller';
import { IntegratorService } from 'src/service/integrator/integrator.service';
import { IntegratorSchema } from 'src/schema/integrator.schema';
import { MainCollectionNumRecordService } from 'src/service/main-collection-num-record/main-collection-num-record.service';
import { mainCollectionRecordSchema } from 'src/schema/mainCollectionRecord.schema';
import { SettlementSchema } from 'src/schema/settlement.schema';
import { SettlementService } from 'src/service/settlement/settlement.service';
import { EquipmentRecordService } from 'src/service/equipment-record/equipment-record.service';
import { EquipmentRecordSchema } from 'src/schema/equipmentRecord.shema';
import { TestService } from 'src/service/test/test.service';
import { TestSchema } from 'src/schema/test.schema';
import { TestController } from './test/test.controller';
import { CacheService } from 'src/service/cache/cache.service';
import { ManagerAccessService } from 'src/service/manager-access/manager-access.service';
import { ManagerAccessSchema } from 'src/schema/manager_access.schema';




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
             MongooseModule.forFeature([{name:'Role',schema:RoleSchema,collection:"role"}],'om'),
             MongooseModule.forFeature([{name:'Access',schema:AccessSchema,collection:"access"}],'om'),
             MongooseModule.forFeature([{name:'RoleAccess',schema:RoleAccessSchema,collection:"role_access"}],'om'),
             MongooseModule.forFeature([{name:'AppIdRecord',schema:AppIdRecordSchema,collection:"appIdRecord"}],'om'),
             MongooseModule.forFeature([{name:'Integrator',schema:IntegratorSchema,collection:"integrator"}],'om'),
             MongooseModule.forFeature([{name:'MainCollectionNumRecord',schema:mainCollectionRecordSchema,collection:"mainCollectionNumRecord"}],'om'),
             MongooseModule.forFeature([{name:'Settlement',schema:SettlementSchema,collection:"settlement"}],'om'),
             MongooseModule.forFeature([{name:'EquipmentRecord',schema:EquipmentRecordSchema,collection:"equipmentRecord"}],'om'),
             MongooseModule.forFeature([{name:'ManagerAccess',schema:ManagerAccessSchema,collection:"managerAccess"}],'om'),

             //测试库
             MongooseModule.forFeature([{name:'Test',schema:TestSchema,collection:"test"}],'om'),


             PassportModule,
             JwtModule.register({               //jwt
                secret:jwtConstants.secret,
                signOptions:{ expiresIn: '1000s' },
             })
            ],

    controllers: [ManagerController, UserController, AuthController, AccountController, 
                  MainCollectionController, EquipmentController, OrderController, 
                  GoodsController, AdvertisingController, ActivitieController, 
                  ApplicationController, RoleController, AccessController, AppIdRecordController, IntegratorController, TestController],
    providers: [ManagerService, UserService, AdvertisingService, GoodsService, 
                AppIdService, MainCollectionService, ApplicationService, AuthService, 
                AccountService, EquipmentService, OrderService, AccountLogService, 
                RoleService, AccessService, RoleAccessService, AppIdRecordService,
                IntegratorService, MainCollectionNumRecordService, SettlementService, 
                EquipmentRecordService, TestService, CacheService, ManagerAccessService,
                JwtStrategy, LocalStrategy],
})
export class AdminModule {}
