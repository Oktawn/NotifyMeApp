import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


class RegisterDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  username: string;
}


class LoginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export {
  RegisterDTO,
  LoginDTO
}