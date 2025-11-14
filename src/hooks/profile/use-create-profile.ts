import { useMutation } from '@tanstack/react-query';
import profileApi from '@/apis/profile.api';
import { INTERESTS, ROLE } from '@/constants/profile.constant';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type { ProfileFormData } from '@/schemas/user.schema';
import type { CreateProfileRequestType, RoleType } from '@/types/profile.type';
import {
  convertActivityModeValue,
  convertAgeValue,
  convertExperienceValue,
  convertGenderValue,
  convertTechStackValue,
} from '@/utils/profile.util';

export default function useCreateProfile() {
  return useMutation({
    mutationFn: async (data: ProfileFormData) => {
      // 데이터 변환
      const requestData: CreateProfileRequestType = {
        nickname: data.nickname,
        profileImageCode: Math.floor(Math.random() * 15) + 1,
        ageBand: convertAgeValue(data.age),
        gender: convertGenderValue(data.gender),
        roleNames: [ROLE[data.role as RoleType]],
        experience: convertExperienceValue(data.experience),
        activityMode: convertActivityModeValue(data.activityMode),
        techSkillNames: data.techStacks.map((stack) =>
          convertTechStackValue(stack),
        ),
        interestKeywordNames: data.interests.map(
          (interest) => INTERESTS[interest],
        ),
        profileUrls: data.links
          .filter((link) => link.value)
          .reduce(
            (acc, link, index) => {
              acc[String(index + 1)] = link.value;
              return acc;
            },
            {} as Record<string, string>,
          ),
        introText: data.intro,
        projectProposalEnabled: data.acceptOffers,
        studyProposalEnabled: data.acceptOffers,
      };

      return await profileApi.createProfile(requestData);
    },
    onSuccess: () => {
      // 성공 시 프로필 여부 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.user, QUERY_KEY.profileExists],
      });
    },
    onError: () => {
      console.error('프로필 생성 실패:');
    },
  });
}
