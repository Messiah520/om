import { Injectable, NestMiddleware } from '@nestjs/common';
import { RoleService } from 'src/service/role/role.service';

@Injectable()
export class RoleAuthMiddleware implements NestMiddleware {
 
  constructor(private roleService : RoleService){}

 async use(req: any, res: any, next: () => void) {

    //var pathname = req.baseUrl; //获取访问的地址

    var pathname = req.url; //获取访问的地址

    var role = req.session.role;

    var hasAuth = await this.roleService.checkAuth(req);

    if(hasAuth){
      next();
    }else{
      res.send('您没有权限访问当前地址');
    }

  }
}
