import { Body, Controller, Post, UsePipes, ValidationPipe, InternalServerErrorException } from '@nestjs/common';
import { ContactService } from './contacts.service';
import { ContactFormDataDto } from './dto/contact-form.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('contact') // This sets the base path for all routes in this file to '/contact'
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handleContactForm(@Body() contactFormDataDto: ContactFormDataDto) {
    try {
      // If the DTO validation passes, the request is handed off to the service.
      return await this.contactService.sendContactEmail(contactFormDataDto);
    } catch (error) {
      // If the email sending fails, catch the error from the service
      // and return a 500 Internal Server Error with a clear message.
      console.error('Contact form submission failed:', error);
      throw new InternalServerErrorException('Failed to send message. Please try again later.');
    }
  }
}