import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //配置cookie中间件
  app.use(cookieParser());

  //配置session的中间件
  app.use(session({secret:'123',cookie:{maxAge:60000}}));

  await app.listen(3000);

  
  
}
bootstrap();
