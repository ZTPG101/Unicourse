import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AdminOrInstructor } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { User } from 'src/database/entities/user.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentsService } from './enrollments.service';
import { SelfOrAdminGuard } from 'src/auth/guards/self-admin.guard';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(dto);
  }

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findById(+id);
  }

  //for bulk update
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrInstructor()
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentsService.update(+id, updateEnrollmentDto);
  }

  //for student user
  @Patch(':id/progress')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  async updateProgress(
    @Param('id') id: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    const updated = await this.enrollmentsService.updateProgress(
      +id,
      updateProgressDto.progress,
    );
    if (!updated) throw new NotFoundException('Enrollment not found');
    return updated;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(+id);
  }
}
