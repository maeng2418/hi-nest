// 모든 것의 루트 모듈
// 모듈 : 애플리케이션의 일부
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController], // url을 가져오고 함수를 실행 (express.js의 라우터와 비슷)
  providers: [AppService], // 비즈니스 로직. 일반적으로 실제 function을 가지는 부분
})
export class AppModule {}
