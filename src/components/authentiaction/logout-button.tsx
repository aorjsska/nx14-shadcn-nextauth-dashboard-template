'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      console.log('로그아웃 성공');
      router.push('/authentication');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 여기에 사용자에게 실패 메시지를 보여주는 로직을 추가할 수 있습니다.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? '로그아웃 중...' : '로그아웃'}
    </Button>
  );
}