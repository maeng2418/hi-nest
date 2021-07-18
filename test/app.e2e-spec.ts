import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach : 새로운 테스트 진행할 때마다 어플리케이션이 새로 생성
  // beforeAll : 새로운 테스트 진행할 때마다 어플리케이션이 새로 생성하지 않음.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스팅 어플리케이션과 메인 어플리케이션을 동일하게 만든다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 데코레이터 없으면 거름. (데코레이터 있는 것만 들어옴.)
        forbidNonWhitelisted: true, // 누군가 이상한 걸 보내면, 리퀘스트 자체를 막아버릴 수 있음. (에러 발생)
        transform: true, // 유저가 보낸 데이터를 원하는 실제 타입으로 변환.
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcom to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'TEST',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'TEST',
          year: 2000,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
    it.todo('SEARCH'); // todo는 작성 예정임을 나타냄.
  });
});
