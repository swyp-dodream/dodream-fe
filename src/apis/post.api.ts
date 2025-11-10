import api from '@/apis/api';

const postApi = {
  cancelOffer: (suggestionId: number) => {
    return api.delete<void>(`/posts/suggestions/${suggestionId}/cancel`);
  },
};

export default postApi;
