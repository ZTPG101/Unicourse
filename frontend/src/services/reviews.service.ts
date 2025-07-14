// Types for reviews
export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  course: {
    id: number;
  };
  createdAt: string;
}

export interface RatingDistribution {
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
}

const API_BASE_URL = 'http://localhost:3000';

export class ReviewsService {
  static async getReviewsByCourseId(courseId: number): Promise<Review[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews?courseId=${courseId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  static calculateRatingDistribution(reviews: Review[]): RatingDistribution {
    const distribution = {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    };

    reviews.forEach(review => {
      switch (review.rating) {
        case 5:
          distribution.fiveStar++;
          break;
        case 4:
          distribution.fourStar++;
          break;
        case 3:
          distribution.threeStar++;
          break;
        case 2:
          distribution.twoStar++;
          break;
        case 1:
          distribution.oneStar++;
          break;
      }
    });

    return distribution;
  }

  static calculateRatingPercentages(reviews: Review[]): {
    fiveStarPercent: number;
    fourStarPercent: number;
    threeStarPercent: number;
    twoStarPercent: number;
    oneStarPercent: number;
  } {
    if (reviews.length === 0) {
      return {
        fiveStarPercent: 0,
        fourStarPercent: 0,
        threeStarPercent: 0,
        twoStarPercent: 0,
        oneStarPercent: 0,
      };
    }

    const distribution = this.calculateRatingDistribution(reviews);
    const total = reviews.length;

    return {
      fiveStarPercent: Math.round((distribution.fiveStar / total) * 100),
      fourStarPercent: Math.round((distribution.fourStar / total) * 100),
      threeStarPercent: Math.round((distribution.threeStar / total) * 100),
      twoStarPercent: Math.round((distribution.twoStar / total) * 100),
      oneStarPercent: Math.round((distribution.oneStar / total) * 100),
    };
  }
}
