import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Public } from 'src/auth/decorators/public.deocrator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('lessons')
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
  @UseGuards(RolesGuard)
  @Roles('instructor', 'admin')
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('instructor', 'admin')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('instructor', 'admin')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  } 
}
