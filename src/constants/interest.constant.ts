export const INTEREST_CATEGORIES = [
  { id: 1, name: '기술' },
  { id: 2, name: '비즈니스' },
  { id: 3, name: '사회' },
  { id: 4, name: '라이프' },
  { id: 5, name: '문화' },
] as const;

export type InterestCategory = (typeof INTEREST_CATEGORIES)[number];
export type InterestCategoryName = InterestCategory['name'];

export const INTEREST_KEYWORDS = [
  { id: 1, categoryId: 1, name: 'AI' },
  { id: 2, categoryId: 1, name: '모빌리티' },
  { id: 3, categoryId: 1, name: '데이터' },
  { id: 4, categoryId: 2, name: '이커머스' },
  { id: 5, categoryId: 2, name: 'O2O' },
  { id: 6, categoryId: 2, name: '금융' },
  { id: 7, categoryId: 3, name: '환경' },
  { id: 8, categoryId: 3, name: '지역' },
  { id: 9, categoryId: 3, name: '교육' },
  { id: 10, categoryId: 4, name: 'F&B' },
  { id: 11, categoryId: 4, name: '패션&뷰티' },
  { id: 12, categoryId: 4, name: '건강' },
  { id: 13, categoryId: 4, name: '여행' },
  { id: 14, categoryId: 4, name: '스포츠' },
  { id: 15, categoryId: 4, name: '반려동물' },
  { id: 16, categoryId: 5, name: '게임' },
  { id: 17, categoryId: 5, name: '미디어' },
  { id: 18, categoryId: 5, name: '예술&공연' },
] as const;

export type InterestKeyword = (typeof INTEREST_KEYWORDS)[number];
export type InterestKeywordName = InterestKeyword['name'];
