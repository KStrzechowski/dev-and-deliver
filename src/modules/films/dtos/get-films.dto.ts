import { IsOptional, IsString } from 'class-validator';

export class GetFilmsQueryDto {
  @IsOptional()
  @IsString()
  title?: string;
}
