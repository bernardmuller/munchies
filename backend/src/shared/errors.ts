/* eslint-disable max-classes-per-file */
export class InvalidRequestError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class AuthenticationError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Authentication required';
  }
}

export class AuthorizationError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Authorization required';
  }
}
export class NotFoundError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Not Found.';
  }
}
