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
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  AdminOnly,
  AdminOrInstructor,
} from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CourseOwnerOrAdminGuard } from 'src/auth/guards/course-owner-or-admin.guard';
import { User } from 'src/database/entities/user.entity';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Public()
  @Get()
  getAllCourse(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const parsedOffset = offset ? parseInt(offset, 10) : undefined;
    return this.coursesService.findAll(parsedLimit, parsedOffset);
  }

  @Public()
  @Get('metadata')
  getCoursesMetadata(
    @Query('search') search?: string,
    @Query('priceMin') priceMin?: string,
    @Query('priceMax') priceMax?: string,
  ) {
    const filters = {
      search: search || undefined,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
    };
    return this.coursesService.getCoursesMetadata(filters);
  }

  @Public()
  @Get(':id')
  getCourse(@Param('id') id: string) {
    return this.coursesService.findById(+id);
  }

  @Post()
  @AdminOrInstructor()
  create(@Body() createCourseDto: CreateCourseDto, @CurrentUser() user: User) {
    return this.coursesService.create(createCourseDto, user);
  }

  @Patch(':id')
  @UseGuards(CourseOwnerOrAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(CourseOwnerOrAdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
