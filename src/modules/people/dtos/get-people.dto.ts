import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../types';

export class GetPeopleQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name!: string;
}
