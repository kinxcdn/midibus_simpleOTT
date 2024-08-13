import { useQuery } from "@tanstack/react-query";
import { getLatestUploadsMediaList } from "../mediaApi";

const useGetLatestUploadsMediaList = (channelId, limit) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latestUploadsMedia", channelId, limit],
    queryFn: () => getLatestUploadsMediaList(channelId, limit),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetLatestUploadsMediaList };
