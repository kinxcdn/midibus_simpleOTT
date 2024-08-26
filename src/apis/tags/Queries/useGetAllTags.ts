import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "../tagApi";

const useGetAllTags = (channelId: string) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allTags", channelId],
    queryFn: () => getAllTags(channelId),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetAllTags };
