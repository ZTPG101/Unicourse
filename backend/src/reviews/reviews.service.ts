import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from 'src/database/entities/review.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Course } from 'src/database/entities/course.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject('REVIEW_REPOSITORY') private ReviewRepo: Repository<Review>,
    @Inject('COURSE_REPOSITORY') private CourseRepo: Repository<Course>,
  ) {}

  // Add this method to calculate average rating
  private async updateCourseRating(courseId: number): Promise<void> {
    const reviews = await this.ReviewRepo.find({
      where: { course: { id: courseId } },
      select: ['rating'],
    });

    if (reviews.length === 0) {
      // No reviews, set rating to 0
      await this.CourseRepo.update({ id: courseId }, { rating: 0 });
      return;
    }

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    // Update course rating (round to 1 decimal place)
    await this.CourseRepo.update(
      { id: courseId },
      { rating: Math.round(averageRating * 10) / 10 },
    );
  }

  async create(
    createReviewDto: CreateReviewDto,
    userId: number,
    courseId: number,
  ): Promise<Review | null> {
    const reviewPayload = this.ReviewRepo.create({
      ...createReviewDto,
      user: { id: userId },
      course: { id: courseId },
    });
    const review = await this.ReviewRepo.save(reviewPayload);

    // Increment reviewCount and update rating
    await this.CourseRepo.increment({ id: courseId }, 'reviewCount', 1);
    await this.updateCourseRating(courseId);

    return this.findById(review.id);
  }

  async findById(id: number): Promise<Review | null> {
    return this.ReviewRepo.findOne({
      where: { id },
    });
  }

  async findByCourseId(
    courseId: number,
    limit: number,
    offset: number,
  ): Promise<Review[]> {
    return this.ReviewRepo.find({
      where: { course: { id: courseId } },
      relations: ['user'],
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findAll(limit: number, offset: number, rating?: number): Promise<Review[]> {
    const findOptions: FindManyOptions<Review> = {
      relations: ['user'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
      where: {},
    };

    if (rating !== undefined) {
      findOptions.where = { rating: rating };
    }

    return this.ReviewRepo.find(findOptions);
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

    const updatedReview = await this.ReviewRepo.save(review);

    // Update course rating when a review is modified
    if (review.course?.id) {
      await this.updateCourseRating(review.course.id);
    }

    return updatedReview;
  }

  async remove(id: number): Promise<{ message: string }> {
    const review = await this.ReviewRepo.findOne({
      where: { id },
      relations: ['course'],
    });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    const courseId = review.course.id;
    const result = await this.ReviewRepo.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    // Decrement reviewCount and update rating
    await this.CourseRepo.decrement({ id: courseId }, 'reviewCount', 1);
    await this.updateCourseRating(courseId);

    return { message: 'Review deleted successfully.' };
  }
}
