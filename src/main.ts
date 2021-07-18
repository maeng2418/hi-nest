// NestJS의 시작
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 어플리케이션 생성
  const app = await NestFactory.create(AppModule);
  // 일종의 미들웨어
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터 없으면 거름. (데코레이터 있는 것만 들어옴.)
      forbidNonWhitelisted: true, // 누군가 이상한 걸 보내면, 리퀘스트 자체를 막아버릴 수 있음. (에러 발생)
      transform: true, // 유저가 보낸 데이터를 원하는 실제 타입으로 변환.
    }),
  );
  await app.listen(3000);
}
bootstrap();
