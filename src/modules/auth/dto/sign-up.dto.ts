import { IsString, IsEmail, MinLength, IsOptional } from "class-validator";

export class SignUpDTO {
    @IsString({ message: "username phải là chữ" })
    username: string;

    @IsString({ message: "password phải là chữ" })
    @MinLength(6, { message: "password phải có ít nhất 6 ký tự" })
    password: string;

    @IsEmail({}, { message: "email không đúng định dạng" })
    @IsOptional()
    email?: string;

    @IsString({ message: "departmentId phải là chữ" })
    @IsOptional()
    departmentId?: string;

    @IsString({ message: "avatarUrl phải là chữ" })
    @IsOptional()
    avatarUrl?: string;
}