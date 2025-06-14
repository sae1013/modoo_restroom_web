# ── Stage 1: Builder ─────────────────────────────────────
FROM node:22 AS builder
WORKDIR /app

# ① 의존성 매니페스트 + Panda 설정 파일 먼저 복사
COPY package.json yarn.lock panda.config.ts postcss.config.cjs ./

# ② 의존성 설치 (prepare → panda codegen 실행)
RUN yarn install --frozen-lockfile

# ③ 나머지 소스코드 복사
COPY . .

# ④ Next.js + Panda 빌드
RUN yarn build



# ── Stage 2: Runner ──────────────────────────────────────
FROM node:22 AS runner
WORKDIR /app
ENV NODE_ENV=production

# ① Standalone 서버 실행 파일 복사
COPY --from=builder /app/.next/standalone ./

# ② 정적 자산 복사
COPY --from=builder /app/.next/static ./.next/static

# ③ public 폴더 복사
COPY --from=builder /app/public ./public

# ④ Panda CSS 런타임 헬퍼 복사
COPY --from=builder /app/styled-system ./styled-system

EXPOSE 3000

# ⑤ 컨테이너 기동
CMD ["node", "server.js"]
