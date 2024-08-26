import { useQuery } from "@tanstack/react-query";
import { getLogin } from "../userApi";
import { LoginProps } from "types/apis/userTypes";

const useGetLogin = ({ authHeader, currentDate }: LoginProps) => {
  return useQuery({
    queryKey: ["userId", { authHeader, currentDate }],
    queryFn: () => {
      if (!authHeader || !currentDate) {
        return null; // queryFn이 실행되지 않도록 합니다.
      }
      return getLogin({ authHeader, currentDate });
    },
    staleTime: 0,
    gcTime: 0, // cacheTime 대신 사용 -> 최신 버전에서 제거됨
    refetchOnWindowFocus: false,
    refetchOnMount: false, // mount 시 자동으로 refetch하지 않도록 설정
    enabled: !!authHeader && !!currentDate, // authHeader와 currentDate가 모두 존재할 때만 실행
  });
};

export { useGetLogin };
