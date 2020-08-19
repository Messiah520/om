import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleService } from 'src/service/role/role.service';

@Injectable()
export class RoleAuthGuard implements CanActivate {

  constructor(private roleService : RoleService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    
    //获取访问的地址
    var pathname = request.url;
    console.log(pathname);
    //console.log(request.session);

    var hasAuth = await this.roleService.checkAuth(request);

    console.log(hasAuth);
    
    // if(hasAuth) {
    //   return true;
    // } else{
    //   return false;
    // }
    return true;
  
  }
}
