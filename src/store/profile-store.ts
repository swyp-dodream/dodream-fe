import { create } from 'zustand';
import type { InterestsType, TechStackType } from '@/types/profile.type';

type ProfileState = {
  // 기술 스택
  techStacks: TechStackType[];

  // 관심 분야
  interests: InterestsType[];
};

type ProfileActions = {
  // 기술 스택 선택 관련 함수
  setStacks: (stacks: TechStackType[]) => void;
  removeStacks: (stack: TechStackType) => void;

  // 관심 분야 관련 함수
  setInterests: (interest: InterestsType[]) => void;
  removeInterests: (interest: InterestsType) => void;
};

/**
 * 유저 프로필 정보를 관리하는 스토어
 */
const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  // 기술 스택
  techStacks: [],
  setStacks: (stacks) => set(() => ({ techStacks: [...stacks] })),
  removeStacks: (stack) =>
    set((state) => ({
      techStacks: state.techStacks.filter((element) => element !== stack),
    })),

  // 관심 분야
  interests: [],
  draftInterests: [],
  setInterests: (interests) => set(() => ({ interests: [...interests] })),
  removeInterests: (interest) =>
    set((state) => ({
      interests: state.interests.filter((element) => element !== interest),
    })),
}));
export default useProfileStore;
