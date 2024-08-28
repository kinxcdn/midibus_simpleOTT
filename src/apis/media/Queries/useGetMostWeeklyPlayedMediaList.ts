import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getMostWeeklyPlayedMediaList } from "../mediaApi";

const useGetMostWeeklyPlayedMediaList = (channelId?: string) => {
  const {
    data = [], // 기본값을 빈 배열로 설정하여 undefined 반환을 방지
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["mostWeeklyMedia", channelId],
    queryFn: () => getMostWeeklyPlayedMediaList(channelId),
    onError: (err: Error) => {
      console.error("Failed to fetch most weekly played media list:", err);
    },
  } as UseQueryOptions<any[], Error>);

  return {
    data,
    isLoading,
    refetch,
    isError,
    error,
  };
};

export { useGetMostWeeklyPlayedMediaList };
