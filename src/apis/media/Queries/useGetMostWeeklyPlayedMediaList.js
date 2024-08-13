import { useQuery } from "@tanstack/react-query";
import { getMostWeeklyPlayedMediaList } from "../mediaApi";

const useGetMostWeeklyPlayedMediaList = (channelId) => {
  const {
    data = [], // 기본값을 빈 배열로 설정하여 undefined 반환을 방지
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mostWeeklyMedia", channelId],
    queryFn: () => getMostWeeklyPlayedMediaList(channelId),
    onError: (err) => {
      console.error("Failed to fetch most weekly played media list:", err);
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetMostWeeklyPlayedMediaList };
