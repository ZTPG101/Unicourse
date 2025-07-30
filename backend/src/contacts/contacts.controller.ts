import { Body, Controller, Post, UsePipes, ValidationPipe, InternalServerErrorException } from '@nestjs/common';
import { ContactService } from './contacts.service';
import { ContactFormDataDto } from './dto/contact-form.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handleContactForm(@Body() contactFormDataDto: ContactFormDataDto) {
    try {
      return await this.contactService.sendContactEmail(contactFormDataDto);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      throw new InternalServerErrorException('Failed to send message. Please try again later.');
    }
  }
}