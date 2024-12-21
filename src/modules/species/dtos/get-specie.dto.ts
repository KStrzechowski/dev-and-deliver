import { IsString } from 'class-validator';

export class GetSpecieParamsDto {
  @IsString()
  id!: string;
}
