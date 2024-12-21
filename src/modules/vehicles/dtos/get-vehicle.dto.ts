import { IsString } from 'class-validator';

export class GetVehicleParamsDto {
  @IsString()
  id!: string;
}
