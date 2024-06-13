import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class SignUpDto {


  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}
