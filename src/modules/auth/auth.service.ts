import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 1. Hàm đăng ký (Lưu departmentId và avatarUrl vào DB)
  async signUp(dto: any) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { username: dto.username },
    });

    if (existingUser) {
      throw new BadRequestException('Username đã tồn tại');
    }

    // Hash password nếu cần thiết trước khi lưu
    // const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        username: dto.username,
        password: dto.password, // Khuyên dùng hashedPassword
        email: dto.email,
        departmentId: dto.departmentId || null, // Lưu departmentId
        avatarUrl: dto.avatarUrl || null,       // Lưu avatarUrl
      },
    });

    return {
      message: 'Đăng ký thành công',
      user: {
        id: newUser.id,
        username: newUser.username,
        departmentId: newUser.departmentId,
        avatarUrl: newUser.avatarUrl,
      },
    };
  }

  // 2. Hàm đăng nhập (Đưa departmentId và avatarUrl vào JWT payload)
  async signIn(dto: any) {
    const user = await this.prismaService.user.findUnique({
      where: { username: dto.username },
    });

    if (!user || user.password !== dto.password) {
      throw new BadRequestException('Sai tài khoản hoặc mật khẩu');
    }

    // Tạo payload JWT chứa departmentId và avatarUrl (Đúng yêu cầu bài tập)
    const payload = {
      sub: user.id,
      username: user.username,
      departmentId: user.departmentId, // Thêm vào payload token
      avatarUrl: user.avatarUrl,       // Thêm vào payload token
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}