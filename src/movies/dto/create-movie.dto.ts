import { IsNumber, IsOptional, IsString } from 'class-validator';

// 데이터 전송 객체. (컨트롤러와 서비스 사이 데이터 전송 객체) 쿼리에 대한 유효성을 검사할 수 있게 해줌.
export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
