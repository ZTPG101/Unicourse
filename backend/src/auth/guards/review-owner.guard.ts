import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ReviewsService } from 'src/reviews/reviews.service';

@Injectable()
export class ReviewOwnerGuard implements CanActivate {
  constructor(private readonly reviewsService: ReviewsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reviewId = parseInt(request.params.id, 10);

    if (!user || isNaN(reviewId)) {
      return false;
    }

    const isOwner = await this.reviewsService.isUserOwnerOfReview(reviewId, user.id);

    if (isOwner) {
      return true;
    }

    throw new ForbiddenException('You do not have permission to modify this review.');
  }
}