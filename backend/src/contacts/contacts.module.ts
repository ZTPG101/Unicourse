import { Module } from '@nestjs/common';
import { ContactController } from './contacts.controller';
import { ContactService } from './contacts.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService], 
})
export class ContactModule {}