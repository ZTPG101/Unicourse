// Types for reviews
export interface Review {
  id: number;
  rating: number;
  fullName: string;
  occupation?: string;
  review: string;
  user?: {
    id: number;
    name: string;
    avatar?: string;
  };
  course?: {
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

const API_BASE_URL = "http://localhost:3000";

export class ReviewsService {
  static getToken() {
    return localStorage.getItem("token");
  }

  static async getReviewsByCourseId(
    courseId: number,
    limit: number,
    offset: number
  ): Promise<Review[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/reviews/by-course/${courseId}?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }

  static async getAllReviews(limit: number, offset: number, rating?: number): Promise<Review[]> {
    try {
      let url = `${API_BASE_URL}/reviews?limit=${limit}&offset=${offset}`;
      if (rating !== undefined) {
        url += `&rating=${rating}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching all reviews:", error);
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

    reviews.forEach((review) => {
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

  static async createReview(data: {
    fullName: string;
    occupation?: string;
    review: string;
    rating: number;
    courseId: number;
  }) {
    const token = this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorMsg = "Failed to create review";

      try {
        const errorData = await res.json();
        if (errorData?.message) {
          errorMsg = errorData.message;
        }
      } catch (_) {
        // Ignore JSON parse errors
      }

      const error = new Error(errorMsg) as Error & { status?: number };
      error.status = res.status;
      throw error;
    }

    return res.json();
  }
}
