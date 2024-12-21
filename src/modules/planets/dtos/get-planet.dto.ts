import { IsString } from 'class-validator';

export class GetPlanetParamsDto {
  @IsString()
  id!: string;
}
