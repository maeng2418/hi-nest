// NestJS의 시작
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 어플리케이션 생성
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
