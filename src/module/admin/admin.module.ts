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

@Module({
    imports:[MongooseModule.forFeature([{name:'Manager',schema:ManagerSchema,collection:"manager"}],'om'),
             MongooseModule.forFeature([{name:'User',schema:UserSchema,collection:"user"}],'om'),
             PassportModule,
             JwtModule.register({
                secret:jwtConstants.secret,
                signOptions:{ expiresIn: '1000s' },
             })
            ],
    controllers: [ManagerController, UserController, AuthController],
    providers:[ManagerService,UserService,AuthService,JwtStrategy,LocalStrategy],
})
export class AdminModule {}UserSchema
