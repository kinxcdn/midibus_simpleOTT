import { useQuery } from "@tanstack/react-query";
import { getLimitTagMediaList } from "../mediaApi";

const useGetLimitTagMediaList = (channelId, limit, categorizedId) => {
  const {
    data = [], // 기본값을 빈 배열로 설정하여 undefined 반환을 방지
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mediaListInLimit", channelId, limit, categorizedId],
    queryFn: () => getLimitTagMediaList(channelId, limit, categorizedId),
    onError: (err) => {
      console.error("Failed to fetch media list by tag with limit:", err);
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetLimitTagMediaList };
