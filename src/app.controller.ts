import { AppService } from './app.service.js';
import { PrismaService } from './modules/prisma/prisma.service.js';
import { 
  Controller, 
  Get, 
  Post, 
  Query, 
  UseInterceptors, 
  UploadedFile 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  ApiQuery, 
  ApiConsumes, 
  ApiBody, 
  ApiTags 
} from '@nestjs/swagger';

@ApiTags('Examples')
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService
  ) {}

  // --- 1. API PHÂN TRANG (Dùng @ApiQuery) ---
  @Get('items')
  @ApiQuery({ name: 'page', required: false, description: 'Trang hiện tại', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng phần tử mỗi trang', type: Number })
  getItems(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return { message: `Lấy danh sách thành công trang ${page}, giới hạn ${limit}` };
  }

  // --- 2. API UPLOAD FILE (Dùng @ApiConsumes và @ApiBody) ---
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // Định dạng giúp Swagger hiển thị nút chọn file
          description: 'Tệp hình ảnh tải lên',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Upload file thành công!',
      filename: file?.originalname,
    };
  }
}