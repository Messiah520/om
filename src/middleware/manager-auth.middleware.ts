import { Injectable, NestMiddleware } from '@nestjs/common';
import { ManagerService } from 'src/service/manager/manager.service';

@Injectable()
export class ManagerAuthMiddleware implements NestMiddleware {
  
  constructor(private readonly managerService: ManagerService){}

  async use(req: any, res: any, next: () => void) {

    var pathname = req.url;

    var manager = req.session.manager;

    var hasAuth = await this.managerService.checkAuth(req);

    if(hasAuth){
      next();
    } else{
      res.send('您没有权限访问当前地址');
    }

  }
}
