import { create } from 'zustand';
import type { InterestKeyword } from '@/types/interest.type';
import type { TechSkill } from '@/types/tech-skill.type';

type PostCreateState = {
  techStacks: TechSkill[];
  interests: InterestKeyword[];
};

type PostCreateActions = {
  setStacks: (stacks: TechSkill[]) => void;
  removeStacks: (stack: TechSkill) => void;
  setInterests: (interests: InterestKeyword[]) => void;
  removeInterests: (interest: InterestKeyword) => void;
};

const usePostCreateStore = create<PostCreateState & PostCreateActions>(
  (set) => ({
    techStacks: [],
    setStacks: (stacks) => set({ techStacks: [...stacks] }),
    removeStacks: (stack) =>
      set((state) => ({
        techStacks: state.techStacks.filter(({ id }) => id !== stack.id),
      })),

    interests: [],
    setInterests: (interests) => set({ interests: [...interests] }),
    removeInterests: (interest) =>
      set((state) => ({
        interests: state.interests.filter(({ id }) => id !== interest.id),
      })),
  }),
);

export default usePostCreateStore;
