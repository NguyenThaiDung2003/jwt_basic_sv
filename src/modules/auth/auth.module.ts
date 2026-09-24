import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module.js';
@Module({
  imports: [
    PrismaModule,
    // 2. Đăng ký JwtModule và cấu hình khóa bí mật (secret) cùng thời gian hết hạn
    JwtModule.register({
      global: true, // Nếu muốn dùng chung toàn cục, hoặc khai báo riêng trong module
      secret: process.env.jwtSecret, // Thay bằng chuỗi bí mật của bạn hoặc dùng ConfigService
      signOptions: { expiresIn: '1d' }, // Thời gian sống của token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
