import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../types';

export class GetSpeciesQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;
}
