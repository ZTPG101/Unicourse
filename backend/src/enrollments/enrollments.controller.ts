import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminOrInstructor } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { SelfOrAdminGuard } from 'src/auth/guards/self-admin.guard';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateEnrollmentDto, @Req() req) {
    const userId = req.user.id;
    return this.enrollmentsService.create(dto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findById(+id);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.findByUserId(id);
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
