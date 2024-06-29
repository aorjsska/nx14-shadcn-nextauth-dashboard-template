// lib/rateLimit.ts

const MAX_ATTEMPTS = 5;
let attempts = MAX_ATTEMPTS;
let resetTime: number | null = null;

export const getRateLimitRemaining = async (): Promise<number> => {
  const now = Date.now();
  
  // 리셋 시간이 지났거나 설정되지 않았다면 초기화
  if (!resetTime || now > resetTime) {
    attempts = MAX_ATTEMPTS;
    resetTime = now + 15 * 60 * 1000; // 15분 후 리셋
  }

  return attempts;
};

export const decreaseAttempts = async (): Promise<void> => {
  if (attempts > 0) {
    attempts--;
  }
};

// 실제 애플리케이션에서는 이 함수를 서버에서 구현해야 합니다.
export const resetAttempts = async (): Promise<void> => {
  attempts = MAX_ATTEMPTS;
  resetTime = null;
};