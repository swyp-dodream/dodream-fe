type Experience = 'new' | '1to3' | '3to5' | '5plus';

export type ApplicantsUser = {
  suggestionId: number;
  applicationId: number;
  userId: number;
  nickname: string;
  profileImage: string;
  createdAt: Date;
  status: string;
  jobGroups: string[];
  tags: string[];
  experience: Experience;
};
