export enum OrderStatus {
  PENDING = 'pending',      // Initial state when order is created
  PROCESSING = 'processing', // Payment received, enrolling in courses
  COMPLETED = 'completed',   // Payment confirmed & enrollment successful
  FAILED = 'failed',        // Payment or enrollment failed
  REFUNDED = 'refunded',    // Course access revoked, money returned
  CANCELLED = 'cancelled'   // Order cancelled before completion
}
