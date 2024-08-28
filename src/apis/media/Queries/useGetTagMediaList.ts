import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getTagMediaList } from "../mediaApi";
import { TagMediaListProps } from "types/apis/mediaTypes";

const useGetTagMediaList = ({
  channelId,
  categorizedId,
}: TagMediaListProps) => {
  const {
    data = [], // 기본값을 빈 배열로 설정하여 undefined 반환을 방지
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery<any[], Error>({
    queryKey: ["mediaListByTag", { channelId, categorizedId }],
    queryFn: () => getTagMediaList({ channelId, categorizedId }),
    enabled: !!categorizedId,
    onError: (err: Error) => {
      console.error("Failed to fetch media list by tag:", err);
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

export { useGetTagMediaList };
