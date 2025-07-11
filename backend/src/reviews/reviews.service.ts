import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from 'src/database/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
      @Inject('REVIEW_REPOSITORY') private ReviewRepo: Repository<Review>,
    ) {}
  
    async create(createReviewDto: CreateReviewDto, userId: number, courseId: number): Promise<Review | null> {
      const reviewPayload = this.ReviewRepo.create({
        ...createReviewDto,
        user: { id: userId },
        course: { id: courseId }
      });
      const review = await this.ReviewRepo.save(reviewPayload);
      return this.findById(review.id);
    }
  
    async findById(id: number): Promise<Review | null> {
      return this.ReviewRepo.findOne({
        where: { id },
      });
    }
  
    findAll(): Promise<Review[]> {
      return this.ReviewRepo.find();
    }
  
    async update(
      id: number,
      updateReviewDto: UpdateReviewDto,
    ): Promise<Review | null> {
      const review = await this.ReviewRepo.preload({
        id,
        ...updateReviewDto,
      });
      if (!review) return null;
      return this.ReviewRepo.save(review);
    }
  
    async remove(id: number): Promise<{ message: string }> {
      const result = await this.ReviewRepo.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Review with id ${id} not found`);
      }
      return { message: 'Review deleted successfully.' };
    }
}
