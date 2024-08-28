import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "../tagApi";

const useGetAllTags = (channelId: string) => {
  const {
    data = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["allTags", channelId],
    queryFn: () => getAllTags(channelId),
  });

  return {
    data,
    isLoading,
    refetch,
    isError,
    error,
  };
};

export { useGetAllTags };
