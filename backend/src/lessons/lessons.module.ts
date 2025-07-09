import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { lessonsProviders } from './lessons.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LessonsController],
  providers: [LessonsService, ...lessonsProviders],
  exports: [LessonsService, ...lessonsProviders],
})
export class LessonsModule {}
