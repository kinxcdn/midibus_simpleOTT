import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getTagListByObject } from "../tagApi";
import { TagListByObjectProps } from "types/apis/tagTypes";

const useGetTagListByObject = ({
  channelId,
  objectId,
}: TagListByObjectProps) => {
  const {
    data = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["tagListByObject", { channelId, objectId }],
    queryFn: () => getTagListByObject({ channelId, objectId }),
    onError: (err: Error) => {
      console.error("Failed to fetch Tag list by object:", err);
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

export { useGetTagListByObject };
