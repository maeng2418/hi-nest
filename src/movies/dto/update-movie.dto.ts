import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// 데이터 전송 객체. (컨트롤러와 서비스 사이 데이터 전송 객체) 쿼리에 대한 유효성을 검사할 수 있게 해줌.
// export class UpdateMovieDto {
//   @IsString()
//   readonly title?: string;
//   @IsNumber()
//   readonly year?: number;
//   @IsString({ each: true })
//   readonly genres?: string[];
// }

export class UpdateMovieDto extends PartialType(CreateMovieDto) {} // 위와 동일
