import { useQuery } from "@tanstack/react-query";
import { getChannelList } from "../userApi";

const useGetChannelList = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allChannelList"],
    queryFn: () => getChannelList(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export { useGetChannelList };
