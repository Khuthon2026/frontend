import type { AppItem } from '../types';

export const APPS: AppItem[] = [
  { name: '무료 VPN Pro',     cat: 'VPN · 보안',      risk: 'high', users: '120만' },
  { name: '무료 VPN Master',  cat: 'VPN · 보안',      risk: 'high', users: '88만' },
  { name: '코인 자동수익봇',     cat: '금융 · 투자',     risk: 'high', users: '54만' },
  { name: '코인마스터 AI',     cat: '금융 · 투자',     risk: 'high', users: '31만' },
  { name: '다이어트 30일',     cat: '건강 · 피트니스',  risk: 'mid',  users: '210만' },
  { name: '다이어트 깔깔한',    cat: '건강 · 피트니스',  risk: 'mid',  users: '47만' },
  { name: '운세 AI 챗',       cat: '라이프스타일',      risk: 'mid',  users: '180만' },
  { name: '사주 풀이당',       cat: '라이프스타일',      risk: 'mid',  users: '92만' },
  { name: '갤럭시 부스터',     cat: '유틸리티',         risk: 'high', users: '160만' },
  { name: '폰 클리너 Pro',    cat: '유틸리티',         risk: 'mid',  users: '74만' },
  { name: '디스코드',          cat: '소셜 · 메신저',    risk: 'safe', users: '4500만' },
  { name: '당근마켓',          cat: '소셜 · 커머스',    risk: 'safe', users: '3800만' },
  { name: '도토리',           cat: '소셜 · 메신저',    risk: 'safe', users: '180만' },
  { name: '넓은 의자',         cat: '투자 · 증권',     risk: 'safe', users: '420만' },
  { name: '토스',             cat: '금융 · 투자',     risk: 'safe', users: '950만' },
  { name: '레디트',           cat: '금융 · 투자',     risk: 'mid',  users: '6만' },
  { name: '레프',             cat: '래퍼럴',           risk: 'safe', users: '210만' },
  { name: '레이트앤페이',       cat: '운송 · 택시',     risk: 'safe', users: '88만' },
];

export const TOP3 = [
  {
    rank: 1,
    title: '라스트 Z: 서바이벌 슈터',
    icon: 'https://play-lh.googleusercontent.com/DVXTZpTR02_xoN1kOqnhOOuW9p1LiUHiu_Vw0xjzdu1SswhIbLp3OdV4x6skiarMGcE',
  },
  {
    rank: 2,
    title: '버섯커 키우기-3000뽑기 증정',
    icon: 'https://play-lh.googleusercontent.com/olgO91YKKQE8d46Mt97SCkZM-SYJBvxrCeP_LRJeewclKhP1K8npUYnUAvkIJ8sEzz0c67Z778p1yV7INLsiQck',
  },
  {
    rank: 3,
    title: '카피바라 Go!',
    icon: 'https://play-lh.googleusercontent.com/UK3PEAFTzKfNyFeXRX_p-9DR34u137jyGnW-Nhy6KlDWoMRHywGQA2uvYPwZMLHoc9Pc',
  },
];

export const ICON_COLORS = ['#1B16CC', '#84CC16', '#152F59', '#B0B0B0', '#0EA5E9', '#F97316', '#A855F7'];

export const PALETTE = {
  lime: '#84CC16',
  navy: '#152F59',
  blue: '#1B16CC',
  gray: '#B0B0B0',
  ink: '#0B1A33',
};
