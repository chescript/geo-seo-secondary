// Client-side error parsing utility

export interface ApiErrorResponse {
  error: {
    message: string;
    code: string;
    statusCode: number;
    timestamp: string;
    fields?: Record<string, string>;
    metadata?: Record<string, any>;
  };
}

export class ClientApiError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly timestamp: Date;
  public readonly fields?: Record<string, string>;
  public readonly metadata?: Record<string, any>;

  constructor(errorResponse: ApiErrorResponse) {
    super(errorResponse.error.message);
    this.code = errorResponse.error.code;
    this.statusCode = errorResponse.error.statusCode;
    this.timestamp = new Date(errorResponse.error.timestamp);
    this.fields = errorResponse.error.fields;
    this.metadata = errorResponse.error.metadata;

    Object.setPrototypeOf(this, ClientApiError.prototype);
  }

  // Helper methods for common error checks
  isAuthenticationError(): boolean {
    return this.statusCode === 401 || this.code === 'UNAUTHORIZED';
  }

  isValidationError(): boolean {
    return this.statusCode === 400 && this.code === 'VALIDATION_ERROR';
  }

  isRateLimitError(): boolean {
    return this.statusCode === 429 || this.code === 'RATE_LIMIT_EXCEEDED';
  }

  isInsufficientCreditsError(): boolean {
    return this.code === 'INSUFFICIENT_CREDITS';
  }

  isNotFoundError(): boolean {
    return this.statusCode === 404 || this.code === 'NOT_FOUND';
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }

  // Get user-friendly error message
  getUserMessage(): string {
    // For most errors, just return the actual message from the API
    // Only provide generic messages for specific cases where the API message isn't user-friendly
    switch (this.code) {
      case 'UNAUTHORIZED':
        return this.message || 'Please log in to continue';
      case 'SESSION_EXPIRED':
        return this.message || 'Your session has expired. Please log in again';
      case 'INSUFFICIENT_CREDITS':
        return this.message || `You need ${this.metadata?.creditsRequired || 'more'} credits. You have ${this.metadata?.creditsAvailable || 0} credits available`;
      case 'RATE_LIMIT_EXCEEDED':
        return this.message || `Too many requests. Please try again in ${this.metadata?.retryAfter || 60} seconds`;
      case 'VALIDATION_ERROR':
        // For validation errors, always use the API message as it's specific
        return this.message;
      case 'EXTERNAL_SERVICE_ERROR':
        // Use the API message if available, otherwise provide generic message
        return this.message || `Service temporarily unavailable${this.metadata?.service ? ` (${this.metadata.service})` : ''}. Please try again later`;
      case 'DATABASE_ERROR':
        return this.message || 'Unable to complete the operation. Please try again';
      default:
        return this.message;
    }
  }
}

// Parse API response and throw ClientApiError if it's an error
export async function parseApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    try {
      const errorData = await response.json() as ApiErrorResponse;
      throw new ClientApiError(errorData);
    } catch (error) {
      if (error instanceof ClientApiError) {
        throw error;
      }
      // Fallback for non-standard error responses
      throw new ClientApiError({
        error: {
          message: 'An unexpected error occurred',
          code: 'UNKNOWN_ERROR',
          statusCode: response.status,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  return response.json();
}

// Hook for handling API errors in React components
export function useApiError() {
  const handleError = (error: unknown): string => {
    if (error instanceof ClientApiError) {
      return error.getUserMessage();
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred';
  };

  return { handleError };
}