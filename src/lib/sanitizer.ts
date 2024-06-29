// lib/sanitizer.ts

export function sanitizeInput(input: string): string {
    // HTML 특수 문자를 이스케이프 처리
    const escapeHTML = (str: string) =>
      str.replace(/[&<>'"]/g, 
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
  
    // 입력값에서 모든 HTML 태그 제거
    const stripTags = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, "");
  
    // 공백 문자 정규화
    const normalizeWhitespace = (str: string) => str.replace(/\s+/g, " ").trim();
  
    // 함수들을 순차적으로 적용
    return normalizeWhitespace(stripTags(escapeHTML(input)));
  }