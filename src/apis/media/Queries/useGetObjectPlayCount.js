import { useQuery } from "@tanstack/react-query";
import { getObjectPlayCount } from "../mediaApi";

const useGetObjectPlayCount = (objectId) => {
  const {
    data = 0, // 기본값을 0으로 설정하여 undefined 반환을 방지
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["objectPlayCount", objectId],
    queryFn: () => getObjectPlayCount(objectId),
    onError: (err) => {
      console.error("Failed to fetch object play count:", err);
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetObjectPlayCount };
