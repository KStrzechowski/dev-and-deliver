import { IsString } from 'class-validator';

export class GetFilmParamsDto {
  @IsString()
  id!: string;
}
