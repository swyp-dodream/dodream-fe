import { create } from 'zustand';
import type { InterestsType, TechStackType } from '@/types/profile.type';

type ProfileState = {
  // 기술 스택
  techStacks: TechStackType[];
  draftStacks: TechStackType[];

  // 관심 분야
  interests: InterestsType[];
  draftInterests: InterestsType[];
};

type ProfileActions = {
  // 기술 스택 선택 관련 함수
  toggleDraftStacks: (stack: TechStackType) => void;
  setDraftStacks: () => void;
  setStacks: () => void;
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
  draftStacks: [],
  toggleDraftStacks: (stack) =>
    set((state) => {
      if (state.draftStacks.includes(stack)) {
        return {
          draftStacks: state.draftStacks.filter((element) => element !== stack),
        };
      } else {
        if (state.draftStacks.length >= 5)
          return { draftStacks: state.draftStacks };
        return { draftStacks: [...state.draftStacks, stack] };
      }
    }),
  setDraftStacks: () =>
    set((state) => ({ draftStacks: [...state.techStacks] })),
  setStacks: () => set((state) => ({ techStacks: [...state.draftStacks] })),
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
