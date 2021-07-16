import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 데코레이터는 꾸며주는 함수나 클래스랑 붙어있어야 한다.
  @Get('/hello')
  sayHello(): string {
    return this.appService.getHi();
  }
}
