import { IsString } from 'class-validator';

export class GetStarshipParamsDto {
  @IsString()
  id!: string;
}
