import { useMutation } from '@tanstack/react-query';
import { ROLE } from '@/constants/profile.constant';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type { ProfileFormData } from '@/schemas/user.schema';
import { clientApis } from '@/services/client.api';
import type { CreateProfileRequestType, RoleType } from '@/types/profile.type';
import {
  convertActivityModeValue,
  convertAgeValue,
  convertExperienceValue,
  convertGenderValue,
} from '@/utils/profile.util';

/** 프로필 생성 */
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
        techSkillIds: data.techStacks,
        interestKeywordIds: data.interests,
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

      return await clientApis.profile.createProfile(requestData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.auth] });
    },
    onError: () => {
      console.error('프로필 생성 실패:');
    },
  });
}
