import { Injectable } from '@nestjs/common';
import { ManagerService } from '../manager/manager.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private readonly managerService:ManagerService,
                private readonly jwtService:JwtService ){}

    async validateManager(managerName:string,password:string):Promise<any>{
        const manager = await this.managerService.findByNameAndPassword({'managerName':managerName,'password':password});
        if(manager){
            return manager;
        }
        return null;
    }

    async login(manager:any){
        const payload = {
            managerName:manager.managerName,
            sub:manager._id,
        };
        return {
            assess_token:this.jwtService.sign(payload),
        }
    }

}
