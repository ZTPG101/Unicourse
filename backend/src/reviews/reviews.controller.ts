import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ReviewOwnerGuard } from 'src/auth/guards/review-owner.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { User } from 'src/database/entities/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get()
  getAllReview(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('rating') rating: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    return this.reviewsService.findAll(
      limitNum,
      offsetNum,
      rating ? parseInt(rating, 10) : undefined,
    );
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

  @Post()
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewsService.create(dto, user.id);
  }

  @Patch(':id')
  @UseGuards(ReviewOwnerGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @CurrentUser() user: User,
  ) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(ReviewOwnerGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.remove(id);
  }
}
