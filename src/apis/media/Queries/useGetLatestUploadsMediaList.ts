import { useQuery } from "@tanstack/react-query";
import { getLatestUploadsMediaList } from "../mediaApi";
import { LatestUploadsMediaListProps } from "types/apis/mediaTypes";

const useGetLatestUploadsMediaList = ({
  channelId,
  limit,
}: LatestUploadsMediaListProps) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latestUploadsMedia", { channelId, limit }],
    queryFn: () => getLatestUploadsMediaList({ channelId, limit }),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetLatestUploadsMediaList };
