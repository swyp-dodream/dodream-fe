export const ROLE_LABEL_MAP = {
  FE: '프론트엔드',
  BE: '백엔드',
  iOS: 'iOS',
  AOS: '안드로이드',
  Designer: '디자이너',
  PM: 'PM',
  Planner: '기획자',
  Marketer: '마케터',
};

export const ROLES = [
  { id: 1, code: 'FRONTEND', name: '프론트엔드' },
  { id: 2, code: 'BACKEND', name: '백엔드' },
  { id: 3, code: 'MOBILE_IOS', name: 'iOS' },
  { id: 4, code: 'MOBILE_ANDROID', name: '안드로이드' },
  { id: 5, code: 'DESIGNER', name: '디자이너' },
  { id: 6, code: 'PLANNER', name: '기획자' },
  { id: 7, code: 'MARKETER', name: '마케터' },
] as const;

export type Role = (typeof ROLES)[number];
export type RoleName = Role['name'];
