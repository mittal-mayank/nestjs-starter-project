import { IsNotEmpty } from "class-validator";

export class UpdateSettingDto {
  @IsNotEmpty()
  readonly value: string;
}
