import { IsIn, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateSettingDto {
  @IsNotEmpty()
  readonly name: string;

  @IsIn(['string', 'number', 'boolean'])
  readonly data_type: string;

  @IsNotEmpty()
  readonly value: string;
}
