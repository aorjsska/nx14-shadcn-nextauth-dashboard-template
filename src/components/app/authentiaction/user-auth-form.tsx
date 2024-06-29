"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Icons } from "../../icons"
import { getCsrfToken, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "../../ui/alert"
import { sanitizeInput } from "@/lib/sanitizer"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <CreateAccount/>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <GithubLogin/>
            <CredentialsLogin useEmployeeId={true}/>
        </div>
    )
}

function CreateAccount() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-2">
                <div className="grid gap-1">
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                    />
                </div>
                <Button disabled={isLoading}>
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In with Email
                </Button>
            </div>
        </form>
    )
}

function GithubLogin() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <form onSubmit={onSubmit}>
            <Button variant="outline" type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                GitHub
            </Button>
        </form>
    )
}

interface CredentialsLoginProps {
    useEmployeeId?: boolean;
}

function CredentialsLogin({ useEmployeeId }: CredentialsLoginProps) {
    const router = useRouter()
    const [identifier, setIdentifier] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [errors, setErrors] = React.useState<{
        identifier?: string
        password?: string
        form?: string
    }>({})
    const [loginStatus, setLoginStatus] = React.useState<{
        attemptsRemaining?: number;
        isLocked: boolean;
        remainingTime?: number;
    }>({ isLocked: false });

    const checkLoginStatus = async () => {
        if (!identifier) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        try {
            const response = await fetch(`${apiUrl}/api/auth/login-status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier })
            });

            const data = await response.json();
            
            if (response.status === 429) {
                setLoginStatus({ isLocked: true, remainingTime: data.remainingTime });
                setErrors({ form: `로그인이 잠겼습니다. ${data.remainingTime}초 후에 다시 시도해주세요.` });
                return false;
            } else {
                setLoginStatus({ isLocked: false, attemptsRemaining: data.attemptsRemaining });
                return data.attemptsRemaining > 0;
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            setErrors({ form: '로그인 상태 확인 중 오류가 발생했습니다.' });
            return false;
        }
    };

    const validateIdentifier = (value: string) => {
        if (!value) {
            return useEmployeeId ? '사번을 입력해주세요.' : '이메일을 입력해주세요.'
        }
        if (useEmployeeId) {
            return /^\d+$/.test(value) ? '' : '올바른 사번 형식이 아닙니다.'
        } else {
            return /\S+@\S+\.\S+/.test(value) ? '' : '올바른 이메일 형식이 아닙니다.'
        }
    }

    const validatePassword = (value: string): string | undefined => {
        if (!value) {
            return '비밀번호를 입력해주세요.'
        }

        if (useEmployeeId) return undefined

        if (value.length < 8) {
            return '비밀번호는 최소 8자 이상이어야 합니다.'
        }

        // 비밀번호 강도 검사 (예: 대문자, 소문자, 숫자, 특수문자 포함)
        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return strongPassword.test(value) ? '' : '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.'
    }

    const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (useEmployeeId) {
            // 사번 입력 시 숫자만 허용
            const numericValue = value.replace(/\D/g, '');
            setIdentifier(numericValue);
        } else {
            setIdentifier(value);
        }
        setErrors(prev => ({ ...prev, identifier: validateIdentifier(value) }))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)
        setErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const canProceed = await checkLoginStatus();
        if (!canProceed) {
            setIsLoading(false);
            return;
        }

        const identifierError = validateIdentifier(identifier);
        const passwordError = validatePassword(password);

        if (identifierError || passwordError) {
            setErrors({
                identifier: identifierError,
                password: passwordError,
            });
            setIsLoading(false);
            return;
        }

        try {
            const result = await signIn('credentials', {
                identifier: sanitizeInput(identifier),
                password,
                csrfToken: getCsrfToken(), // CSRF 토큰 추가
                redirect: false
            });

            if (result?.error) {
                setErrors({ form: `로그인에 실패했습니다. ${useEmployeeId ? '사번' : '이메일'}과 비밀번호를 확인해주세요.` });
                console.error(result.error);
                await checkLoginStatus();  // 로그인 실패 후 상태 다시 확인
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ form: '로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-1">
                <Input
                    id="identifier"
                    type={useEmployeeId ? "text" : "email"}
                    placeholder={useEmployeeId ? "사번을 입력하세요" : "name@example.com"}
                    required
                    value={identifier}
                    onChange={handleIdentifierChange}
                    disabled={isLoading}
                    autoCapitalize="none"
                    autoComplete={useEmployeeId ? "off" : "email"}
                    autoCorrect="off" 
                    inputMode={useEmployeeId ? "numeric" : "email"} 
                />
                {errors.identifier && <AlertDescription>{errors.identifier}</AlertDescription>}
                <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                />
                {errors.password && <AlertDescription>{errors.password}</AlertDescription>}
                <Button 
                    variant="outline" 
                    type="submit" 
                    disabled={isLoading || !!errors.identifier || !!errors.password || loginStatus.isLocked}
                >
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.logo className="mr-2 h-4 w-4" />
                    )}{" "}
                    Credentials Login
                </Button>
                {errors.form && (
                    <Alert variant="destructive">
                        <AlertDescription>{`남은 로그인 시도 횟수: ${loginStatus.attemptsRemaining}`}<br/>{errors.form}</AlertDescription>
                    </Alert>
                )}
                {loginStatus.attemptsRemaining !== undefined && loginStatus.attemptsRemaining < 3 && (
                    <Alert variant="destructive" className="border-yellow-500 text-yellow-700">
                        <AlertDescription>{`남은 로그인 시도 횟수: ${loginStatus.attemptsRemaining}`}</AlertDescription>
                    </Alert>
                )}
            </div>
        </form>
    )
}