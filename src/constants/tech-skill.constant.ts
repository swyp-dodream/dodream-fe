export const TECH_SKILL_CATEGORIES = [
  { id: 1, name: '프론트엔드' },
  { id: 2, name: '백엔드' },
  { id: 3, name: '모바일' },
  { id: 4, name: '디자인' },
] as const;

export type TechSkillCategory = (typeof TECH_SKILL_CATEGORIES)[number];
export type TechSkillCategoryName = TechSkillCategory['name'];

export const TECH_SKILLS = [
  // 프론트엔드
  { id: 1, categoryId: 1, name: 'JavaScript' },
  { id: 2, categoryId: 1, name: 'TypeScript' },
  { id: 3, categoryId: 1, name: 'React' },
  { id: 4, categoryId: 1, name: 'Vue' },
  { id: 5, categoryId: 1, name: 'Svelte' },
  { id: 6, categoryId: 1, name: 'Nextjs' },
  // 백엔드
  { id: 7, categoryId: 2, name: 'Java' },
  { id: 8, categoryId: 2, name: 'Spring' },
  { id: 9, categoryId: 2, name: 'Nodejs' },
  { id: 10, categoryId: 2, name: 'Nestjs' },
  { id: 11, categoryId: 2, name: 'Go' },
  { id: 12, categoryId: 2, name: 'Express' },
  { id: 13, categoryId: 2, name: 'MySQL' },
  { id: 14, categoryId: 2, name: 'MongoDB' },
  { id: 15, categoryId: 2, name: 'Ruby' },
  { id: 16, categoryId: 2, name: 'Python' },
  { id: 17, categoryId: 2, name: 'Django' },
  { id: 18, categoryId: 2, name: 'php' },
  { id: 19, categoryId: 2, name: 'GraphQL' },
  { id: 20, categoryId: 2, name: 'Firebase' },
  // 모바일
  { id: 21, categoryId: 3, name: 'Swift' },
  { id: 22, categoryId: 3, name: 'Objective-C' },
  { id: 23, categoryId: 3, name: 'Kotlin' },
  { id: 24, categoryId: 3, name: 'Flutter' },
  { id: 25, categoryId: 3, name: 'ReactNative' },
  // 디자인
  { id: 26, categoryId: 4, name: 'Zeplin' },
  { id: 27, categoryId: 4, name: 'Figma' },
  { id: 28, categoryId: 4, name: 'Sketch' },
  { id: 29, categoryId: 4, name: 'Adobe' },
] as const;

export type TechSkill = (typeof TECH_SKILLS)[number];
export type TechSkillName = TechSkill['name'];
