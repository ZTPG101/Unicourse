import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  AdminOrInstructor
} from 'src/auth/decorators/roles.decorator';
import { CourseOwnerOrAdminGuard } from 'src/auth/guards/course-owner-or-admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Public()
  @Get()
  getAllLesson() {
    return this.lessonsService.findAll();
  }

  @Public()
  @Get(':id')
  getLesson(@Param('id') id: string) {
    return this.lessonsService.findById(+id);
  }

  @Post()
  @AdminOrInstructor()
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(CourseOwnerOrAdminGuard)
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @UseGuards(CourseOwnerOrAdminGuard)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
