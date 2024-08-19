import { useQuery } from "@tanstack/react-query";
import { getTagMediaList } from "../mediaApi";

const useGetTagMediaList = (channelId, categorizedId) => {
  const {
    data = [], // 기본값을 빈 배열로 설정하여 undefined 반환을 방지
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mediaListByTag", channelId, categorizedId],
    queryFn: () => getTagMediaList(channelId, categorizedId),
    enabled: !!categorizedId,
    onError: (err) => {
      console.error("Failed to fetch media list by tag:", err);
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetTagMediaList };
