import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly password: string;
}
