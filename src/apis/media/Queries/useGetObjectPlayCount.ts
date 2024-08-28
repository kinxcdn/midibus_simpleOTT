import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getObjectPlayCount } from "../mediaApi";

const useGetObjectPlayCount = (objectId: string) => {
  const {
    data = 0, // 기본값을 0으로 설정하여 undefined 반환을 방지
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["objectPlayCount", objectId],
    queryFn: () => getObjectPlayCount(objectId),
    onError: (err: Error) => {
      console.error("Failed to fetch object play count:", err);
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

export { useGetObjectPlayCount };
