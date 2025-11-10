import { create } from 'zustand';
import type { TechStackType } from '@/types/profile.type';

type ProfileState = {
  /** 실제 선택한 기술 스택 */
  techStacks: TechStackType[];
  /** 임시 저장 기술 스택 */
  draftStacks: TechStackType[];
};

type ProfileActions = {
  /** 기술 스택을 임시 저장 */
  toggleDraft: (stack: TechStackType) => void;
  /** 임시 기술 스택을 초기 세팅 */
  setDraft: () => void;
  /** 선택한 기술 스택을 저장 */
  setStacks: () => void;
};

/**
 * 유저 프로필 정보를 관리하는 스토어
 */
const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  techStacks: [],
  draftStacks: [],
  toggleDraft: (stack) =>
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
  setDraft: () => set((state) => ({ draftStacks: [...state.techStacks] })),
  setStacks: () => set((state) => ({ techStacks: [...state.draftStacks] })),
}));

export default useProfileStore;
