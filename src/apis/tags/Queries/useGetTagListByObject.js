import { useQuery } from "@tanstack/react-query";
import { getTagListByObject } from "../tagApi";

const useGetTagListByObject = (channelId, objectId) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tagListByObject", channelId, objectId],
    queryFn: () => getTagListByObject(channelId, objectId),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetTagListByObject };
