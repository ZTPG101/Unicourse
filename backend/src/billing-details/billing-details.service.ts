import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateBillingDetailDto } from './dto/create-billing-detail.dto';
import { UpdateBillingDetailDto } from './dto/update-billing-detail.dto';
import { BillingDetails } from 'src/database/entities/billingDetails.entity';

@Injectable()
export class BillingDetailsService {
  constructor(
    @Inject('BILLING_DETAILS_REPOSITORY')
    private readonly billingDetailsRepo: Repository<BillingDetails>,
  ) {}

  async findByUserId(userId: number): Promise<BillingDetails | null> {
    return this.billingDetailsRepo.findOne({ where: { user: { id: userId } } });
  }

  async create(createDto: CreateBillingDetailDto, userId: number): Promise<BillingDetails> {
    const existingDetails = await this.findByUserId(userId);
    if (existingDetails) {
      throw new NotFoundException('Billing details already exist for this user. Use PATCH to update.');
    }
    const newDetails = this.billingDetailsRepo.create({
      ...createDto,
      user: { id: userId },
    });
    return this.billingDetailsRepo.save(newDetails);
  }

  async updateByUser(userId: number, updateDto: UpdateBillingDetailDto): Promise<BillingDetails> {
    const billingDetails = await this.findByUserId(userId);
    if (!billingDetails) {
      throw new NotFoundException('Billing details not found for this user. Use POST to create.');
    }
    // Update the found entity and save it
    Object.assign(billingDetails, updateDto);
    return this.billingDetailsRepo.save(billingDetails);
  }
}