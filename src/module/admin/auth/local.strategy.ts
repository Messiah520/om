import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService:AuthService){
        super();
    }

    async validate(managerName:string,password:string):Promise<any>{
        const manager = await this.authService.validateManager(managerName,password);
        if(!manager){
            throw new UnauthorizedException();
        }
        return manager;
    }




}