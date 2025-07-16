import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { AdminOnly, AdminOrInstructor } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Public()
  @Get()
  getAllCourse(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const parsedOffset = offset ? parseInt(offset, 10) : undefined;
    return this.coursesService.findAll(parsedLimit, parsedOffset);
  }

  @Public()
  @Get('metadata')
  getCoursesMetadata(
    @Query('search') search?: string,
    @Query('priceMin') priceMin?: string,
    @Query('priceMax') priceMax?: string
  ) {
    // Convert query params to appropriate types
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrInstructor()
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrInstructor()
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
