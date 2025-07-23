import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { SelfOrAdminGuard } from 'src/auth/guards/self-admin.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';
import { User } from 'src/database/entities/user.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get()
  getAllReview(@Query('limit') limit: string, @Query('offset') offset: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    return this.reviewsService.findAll(limitNum, offsetNum);
  }

  @Public()
  @Get('by-course/:courseId')
  findByCourse(
    @Param('courseId') courseId: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const courseIdNum = parseInt(courseId, 10);
    const limitNum = limit ? parseInt(limit, 10) : 5;
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    return this.reviewsService.findByCourseId(courseIdNum, limitNum, offsetNum);
  }

  @Public()
  @Get(':id')
  getReview(@Param('id') id: string) {
    return this.reviewsService.findById(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewsService.create(dto, user.id, dto.courseId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
