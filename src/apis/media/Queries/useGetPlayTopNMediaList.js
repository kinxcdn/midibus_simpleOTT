import { useQuery } from "@tanstack/react-query";
import { getPlayTopNMediaList } from "../mediaApi";

const useGetPlayTopNMediaList = (objectList, channelId) => {
  const {
    data = [], // 기본값을 빈 배열로 설정하여 undefined 반환을 방지
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["playTopNMedia", objectList, channelId],
    queryFn: () => getPlayTopNMediaList(objectList, channelId),
    enabled: objectList.length > 0,
    onError: (err) => {
      console.error("Failed to fetch top N played media list:", err);
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetPlayTopNMediaList };