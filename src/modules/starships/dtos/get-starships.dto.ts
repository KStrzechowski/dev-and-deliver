import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../types';

export class GetStarshipsQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  model!: string;
}
