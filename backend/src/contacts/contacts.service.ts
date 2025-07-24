// In your BACKEND: src/contact/contact.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactFormDataDto } from './dto/contact-form.dto';

@Injectable()
export class ContactService {
  // You would configure this transporter using environment variables
  private transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Your SMTP host
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  async sendContactEmail(formData: ContactFormDataDto): Promise<{ message: string }> {
    const { name, email, subject, message } = formData;

    const mailOptions = {
      from: `"Unicourse" <unicourse@yoursite.com>`,
      to: 'pobborisut@gmail.com', // The email address that receives the messages
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { message: 'Your message has been sent successfully!' };
    } catch (error) {
      console.error('Failed to send contact email:', error);
      throw new Error('Failed to send message. Please try again later.');
    }
  }
}