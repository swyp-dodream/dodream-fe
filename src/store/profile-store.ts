import { create } from 'zustand';
import type { InterestsType, TechStackType } from '@/types/profile.type';

type ProfileState = {
  // 기술 스택
  techStacks: TechStackType[];

  // 관심 분야
  interests: InterestsType[];
  draftInterests: InterestsType[];
};

type ProfileActions = {
  // 기술 스택 선택 관련 함수
  setStacks: (stacks: TechStackType[]) => void;
  removeStacks: (stack: TechStackType) => void;

  // 관심 분야 관련 함수
  toggleDraftInterests: (interest: InterestsType) => void;
  setDraftInterests: () => void;
  setInterests: () => void;
  removeInterests: (interest: InterestsType) => void;
};

/**
 * 유저 프로필 정보를 관리하는 스토어
 */
const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  // 기술 스택
  techStacks: [],
  setStacks: (stacks: TechStackType[]) =>
    set(() => ({ techStacks: [...stacks] })),
  removeStacks: (stack) =>
    set((state) => ({
      techStacks: state.techStacks.filter((element) => element !== stack),
    })),

  // 관심 분야
  interests: [],
  draftInterests: [],
  toggleDraftInterests: (interest) =>
    set((state) => {
      if (state.draftInterests.includes(interest)) {
        return {
          draftInterests: state.draftInterests.filter(
            (element) => element !== interest,
          ),
        };
      } else {
        if (state.draftInterests.length >= 5)
          return { draftInterests: state.draftInterests };
        return { draftInterests: [...state.draftInterests, interest] };
      }
    }),
  setDraftInterests: () =>
    set((state) => ({ draftInterests: [...state.interests] })),
  setInterests: () =>
    set((state) => ({ interests: [...state.draftInterests] })),
  removeInterests: (interest) =>
    set((state) => ({
      interests: state.interests.filter((element) => element !== interest),
    })),
}));
export default useProfileStore;
