# CLAUDE.md

이 파일은 Claude Code가 프로젝트 컨텍스트를 이해하기 위한 파일입니다.
해커톤 전용 설정이므로, 속도와 완성도를 최우선으로 합니다.

---

## 프로젝트 개요

- **목적**: 해커톤 프론트엔드 프로젝트
- **주제**: 미정 (확정 시 업데이트 예정)
- **개발 기간**: 해커톤 당일 (단기 집중 개발)
- **팀 규모**: 4명

---

## 기술 스택

| 분류 | 기술 |
| --- | --- |
| Framework | React 19 + Vite 8 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 |
| 상태관리 | Zustand 또는 React 내장 훅 (최소한으로 사용) |
| HTTP Client | Axios 또는 fetch |
| 라우팅 | React Router v7 (필요 시 설치) |
| 배포 | Vercel (GitHub main 브랜치 자동 배포) |

> Zustand, Axios, React Router는 기본 설치 상태가 아닙니다. 사용 시 `npm install` 로 추가하세요.

---

## 프로젝트 구조

```
src/
├── pages/                # 페이지 컴포넌트 (라우트 단위)
├── components/
│   ├── ui/               # 공통 UI 컴포넌트 (버튼, 인풋 등)
│   └── features/         # 기능별 컴포넌트
├── hooks/                # 커스텀 훅
├── lib/
│   ├── api/              # API 호출 함수 모음
│   └── utils/            # 유틸 함수
├── types/                # TypeScript 타입 정의
└── constants/            # 상수값 모음
```

`@/` alias가 `src/` 루트에 매핑되어 있습니다. 절대 경로 import를 사용하세요.

```ts
// ✅ Good
import { Button } from '@/components/ui/Button';

// ❌ Bad
import { Button } from '../../components/ui/Button';
```

---

## 코드 컨벤션

### 네이밍

- **컴포넌트**: PascalCase → `UserCard.tsx`
- **훅**: camelCase, use 접두사 → `useUserData.ts`
- **유틸/함수**: camelCase → `formatDate.ts`
- **타입/인터페이스**: PascalCase, I 접두사 금지 → `UserProfile`, `ApiResponse`
- **상수**: UPPER_SNAKE_CASE → `API_BASE_URL`

### 컴포넌트 작성 규칙

- 컴포넌트는 **함수형 컴포넌트**만 사용
- `export default`는 파일 하단에 한 번만
- Props 타입은 컴포넌트 바로 위에 정의

```tsx
// ✅ Good
type UserCardProps = {
  name: string;
  email: string;
};

const UserCard = ({ name, email }: UserCardProps) => {
  return <div>{name}</div>;
};

export default UserCard;
```

### API 호출

- 모든 API 호출은 `src/lib/api/` 하위에 기능별로 분리
- 컴포넌트 내부에 직접 fetch 호출 금지
- 로컬 개발 시 Vite proxy가 `/api` 경로를 `localhost:8080`으로 포워딩

```ts
// src/lib/api/user.ts
export const getUser = async (id: string) => {
  const res = await axios.get(`/api/users/${id}`);
  return res.data;
};
```

### 환경변수

- 환경변수는 반드시 `VITE_` 접두사 규칙 준수
- 로컬 개발값은 `.env.local`에 작성 (커밋 금지, `.gitignore` 적용됨)
- `.env.example`에 키 목록만 유지 (커밋 대상)

---

## 버전 관리

- `package-lock.json`은 절대 `.gitignore`에 추가하지 않음
- 패키지 설치 시 반드시 `npm install` 사용 (yarn 혼용 금지)
- 새 패키지 설치 후 `package-lock.json` 변경사항도 함께 커밋

---

## 브랜치 전략

```
main         ← Vercel 자동 배포 (직접 push 금지)
dev          ← 통합 브랜치 (PR 후 머지, CI 자동 실행)
{이름}       ← 개인 작업 브랜치 (예: jihun, gildong)
```

### 규칙

1. **개인 브랜치 → dev** PR 후 머지
2. **dev → main** 은 배포 준비 완료 시점에만 머지
3. 큰 기능이 dev에 머지될 때마다 **개인 브랜치에 dev를 머지해서 싱크 유지**
4. main에 직접 push 절대 금지

---

## 배포 환경

- **플랫폼**: Vercel
- **자동 배포**: `main` 브랜치 push 시 자동 배포
- **Preview 배포**: PR 생성 시 Vercel Preview URL 자동 생성
- **SPA 라우팅**: `vercel.json`에 리라이트 규칙 설정됨 (`/*` → `/index.html`)
- **환경변수**: Vercel 대시보드에서 관리 (`.env.local` 값을 Vercel에 동일하게 등록)

---

## 백엔드 API 연동

- 백엔드 Base URL은 환경변수로 관리 (`VITE_API_BASE_URL`)
- **로컬 개발**: Vite proxy가 `/api` → `http://localhost:8080` 자동 포워딩
  - `axios.get('/api/users')` 처럼 상대 경로로 호출
  - `.env.local`에 `VITE_API_BASE_URL=http://localhost:8080` 설정
- **배포 환경**: Vercel 대시보드에 Railway 백엔드 URL 등록

---

## 해커톤 필수 주의사항

### 하지 말아야 할 것 ❌

- 전역 상태관리 라이브러리 과도하게 도입 (Redux 등 무거운 것 금지)
- 컴포넌트 과도한 추상화 (지금 쓰이는 곳이 한 군데면 분리하지 말 것)
- 애니메이션, 트랜지션에 시간 쏟기 (MVP 완성 후 여유 있을 때만)
- 완벽한 반응형보다 **데모 해상도(1280px 기준) 우선**
- 폴더 구조 완벽하게 정리하다가 시간 낭비

### 우선순위 ✅

1. 핵심 기능 동작 여부
2. 발표용 화면 완성도
3. 백엔드 API 연동
4. 나머지 디테일

---

## 자주 쓰는 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드 확인 (배포 전 필수)
npm run build

# 린트 확인
npm run lint

# 타입 체크 (tsconfig.app.json 기준 — 루트 tsconfig.json 직접 실행 시 파일 0개 검사)
npx tsc -p tsconfig.app.json --noEmit
```

---

## 참고

- 백엔드 API 명세: `team-docs` 레포 또는 Notion 참고
- 디자인 시안: Figma 링크 (추후 업데이트)
- 문의: GitHub Issues 또는 Discord

> UI 작업 시 @design.md 를 반드시 참조하세요.

## 성과 문서화
팀장이 "문서화해줘"라고 요청하면 @docs/DOCS_GUIDE.md 를 참조해서 정리하세요.