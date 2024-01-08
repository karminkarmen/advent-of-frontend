export class RateLimiter {
  constructor(
    private readonly maxRequests: number,
    private readonly intervalMs: number
  ) {}

  requestsCount = 0;
  timeout?: ReturnType<typeof setTimeout>;

  attemptAccess() {
    this.requestsCount++;

    if (!this.timeout) {
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.requestsCount = 0;
      }, this.intervalMs);
    }

    return this.requestsCount <= this.maxRequests;
  }
}