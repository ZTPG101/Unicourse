import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BillingDetails } from '../database/entities/billingDetails.entity';
import { CreateBillingDetailDto } from './dto/create-billing-detail.dto';
import { UpdateBillingDetailDto } from './dto/update-billing-detail.dto';

@Injectable()
export class BillingDetailsService {
  constructor(
    @Inject('BILLING_DETAILS_REPOSITORY')
    private readonly billingDetailsRepo: Repository<BillingDetails>,
  ) {}

  async create(createBillingDetailDto: CreateBillingDetailDto, user: any): Promise<BillingDetails> {
    const billingDetails = this.billingDetailsRepo.create({ ...createBillingDetailDto, user });
    return this.billingDetailsRepo.save(billingDetails);
  }

  async findAll(): Promise<BillingDetails[]> {
    return this.billingDetailsRepo.find();
  }

  async findOne(id: number): Promise<BillingDetails | null> {
    return this.billingDetailsRepo.findOne({ where: { id } });
  }

  async update(id: number, updateBillingDetailDto: UpdateBillingDetailDto): Promise<BillingDetails> {
    const billingDetails = await this.billingDetailsRepo.findOne({ where: { id } });
    if (!billingDetails) throw new Error('Billing details not found');
    Object.assign(billingDetails, updateBillingDetailDto);
    return this.billingDetailsRepo.save(billingDetails);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.billingDetailsRepo.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Billing details with id ${id} not found`);
    }
    return { message: 'Billing details deleted successfully.' };
  }
}
