import { useMutation } from '@tanstack/react-query';
import { INTERESTS, ROLE } from '@/constants/profile.constant';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type { ProfileEditFormData } from '@/schemas/user.schema';
import { clientApis } from '@/services/client.api';
import type { RoleType, UpdateProfileRequestType } from '@/types/profile.type';
import {
  convertActivityModeValue,
  convertExperienceValue,
} from '@/utils/profile.util';

/** 프로필 업데이트 */
export default function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: ProfileEditFormData) => {
      const requestData: UpdateProfileRequestType = {
        nickname: data.nickname,
        // TODO: 프로필 이미지 값 수정
        profileImageCode: Math.floor(Math.random() * 15) + 1,
        roleNames: [ROLE[data.role as RoleType]],
        experience: convertExperienceValue(data.experience),
        activityMode: convertActivityModeValue(data.activityMode),
        techSkillNames: data.techStacks,
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
      };

      return clientApis.profile.updateProfile(requestData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.profile],
      });
    },
  });
}
