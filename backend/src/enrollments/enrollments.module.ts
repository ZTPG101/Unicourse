import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { enrollmentsProviders } from './enrollments.providers';
import { SelfOrAdminGuard } from 'src/auth/guards/self-admin.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, ...enrollmentsProviders, SelfOrAdminGuard],
  exports: [EnrollmentsService, ...enrollmentsProviders],
})
export class EnrollmentsModule {}
