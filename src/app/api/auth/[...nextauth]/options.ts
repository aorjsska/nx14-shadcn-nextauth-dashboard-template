import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// 로그인 시도를 추적하는 맵
const loginAttempts = new Map<string, { attempts: number; lastAttempt: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15분

export const authOptions: AuthOptions  = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials");
        }

        const { identifier, password } = credentials;

        // 로그인 시도 확인
        const attemptKey = `${identifier}`;
        const attempt = loginAttempts.get(attemptKey) || { attempts: 0, lastAttempt: 0 };
        const now = Date.now();

        if (attempt.attempts >= MAX_ATTEMPTS && now - attempt.lastAttempt < LOCKOUT_TIME) {
          throw new Error("Too many login attempts. Please try again later.");
        }

        // 서버 or DB에서 user 가져오는 로직으로 변경하여 사용 할 것.
        const user = {
          id: "admin",
          password:  await bcrypt.hash("admin", 10),
          email: "admin@admin.com",
          name: "admin",
        }

        if (!user) {
          updateLoginAttempt(attemptKey);
          throw new Error("No user found");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordValid) {
          updateLoginAttempt(attemptKey);
          // DB에서 로그인 시도 횟수 GET 로직으로 사용 할 것
          // const response = await fetch(`Database`, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({
          //     loginAttempts
          //   })
          // })
          throw new Error("Invalid password");
        }

        // 로그인 성공 시 시도 횟수 초기화
        loginAttempts.delete(attemptKey);
        // DB에서 로그인 시도 횟수 GET 로직으로 사용 할 것
        // const response = await fetch(`Database`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     loginAttempts
        //   })
        // })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 5 * 60, // 5분 (초 단위로 설정)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signOut({ session, token }) {
      // 여기에 로그아웃 시 수행할 추가 작업을 넣을 수 있습니다.
      // 예: 데이터베이스에서 사용자의 세션 정보 삭제 등
    },
  },
  pages: {
    signIn: "/authentication",
  },
};

function updateLoginAttempt(key: string) {
  const attempt = loginAttempts.get(key) || { attempts: 0, lastAttempt: 0 };
  attempt.attempts += 1;
  attempt.lastAttempt = Date.now();
  loginAttempts.set(key, attempt);
}