import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserRegisterDTO{
    @IsEmail()
    email!:string;

    @IsString()
    @MinLength(6)
    password!:string;
    
}

export class UserUpdateDTO{
    @IsEmail()
    @IsOptional()
    email?:string

    @IsString()
    @IsOptional()
    password?:string
}