import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { DatabaseModule } from 'src/database/database.module';
import { sessionProviders } from './session.providers';

@Module({
  imports: [DatabaseModule],
  providers: [SessionService, ...sessionProviders],
  exports: [SessionService, ...sessionProviders],
})
export class SessionModule {}
