import { IsString, IsOptional } from "class-validator";

export class SignInDTO {
    @IsString({
        message: "username phải là chữ"
    })
    username: string;

    @IsString({
        message: "password phải là chữ"
    })
    password: string;

    @IsString({
        message: "departmentId phải là chữ"
    })
    @IsOptional() // Có thể dùng IsOptional nếu trường này không bắt buộc phải truyền lên từ client khi đăng nhập
    departmentId: string;

    @IsString({
        message: "avatarUrl phải là chữ"
    })
    @IsOptional()
    avatarUrl: string;
}