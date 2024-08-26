import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getLimitTagMediaList } from "../mediaApi";
import { LimitTagMediaListProps } from "types/apis/mediaTypes";

const useGetLimitTagMediaList = ({
  channelId,
  limit,
  categorizedId,
}: LimitTagMediaListProps) => {
  const {
    data = [], // 기본값을 빈 배열로 설정하여 undefined 반환을 방지
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mediaListInLimit", { channelId, limit, categorizedId }],
    queryFn: () => getLimitTagMediaList({ channelId, limit, categorizedId }),
    onError: (err: Error) => {
      console.error("Failed to fetch media list by tag with limit:", err);
    },
  } as UseQueryOptions<any[], Error>);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetLimitTagMediaList };
