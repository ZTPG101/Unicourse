import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { DatabaseModule } from 'src/database/database.module';
import { instructorsProviders } from './instructors.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [InstructorsController],
  providers: [InstructorsService, ...instructorsProviders],
  exports: [InstructorsService, ...instructorsProviders],
})
export class InstructorsModule {}
