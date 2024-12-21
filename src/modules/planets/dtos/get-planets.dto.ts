import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../types';

export class GetPlanetsQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name!: string;
}
