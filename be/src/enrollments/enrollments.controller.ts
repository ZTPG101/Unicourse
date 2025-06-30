import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { User } from 'src/entities/user.entity';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  // TODO: auth guard
  // @UseGuards(AuthGuard)
  // create(@currentUser() user: User, dto: CreateEnrollmentDto) {
  //   return this.enrollmentsService.create(user.id, dto.courseId);
  // }

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(+id);
  }
}
