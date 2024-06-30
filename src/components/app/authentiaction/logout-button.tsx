'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, ButtonProps } from '../../ui/button';
import { useState } from 'react';

// LogoutButton의 props 타입을 ButtonProps를 확장하여 정의
interface LogoutButtonProps extends ButtonProps {
  // 여기에 LogoutButton에만 특정한 추가 props가 있다면 정의할 수 있습니다.
}

export default function LogoutButton({ children, ...props }: LogoutButtonProps) {
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
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? '로그아웃 중...' : '로그아웃'}
    </Button>
  );
}