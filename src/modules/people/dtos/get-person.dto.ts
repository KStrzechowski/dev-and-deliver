import { IsString } from 'class-validator';

export class GetPersonParamsDto {
  @IsString()
  id!: string;
}
