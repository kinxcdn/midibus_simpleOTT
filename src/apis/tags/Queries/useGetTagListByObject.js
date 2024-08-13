import { useQuery } from "@tanstack/react-query";
import { getTagListByObject } from "../tagApi";

const useGetTagListByObject = (channelId, categorizedId) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tagListByObject", channelId, categorizedId],
    queryFn: () => getTagListByObject(channelId, categorizedId),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetTagListByObject };
