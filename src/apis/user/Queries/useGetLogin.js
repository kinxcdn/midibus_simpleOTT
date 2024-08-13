import { useQuery } from "@tanstack/react-query";
import { getLogin } from "../userApi";

const useGetLogin = (authHeader, currentDate) => {
  return useQuery({
    queryKey: ["userId", { authHeader, currentDate }],
    queryFn: () => getLogin(authHeader, currentDate),
    staleTime: 0, // 데이터를 항상 최신 상태로 유지
    cacheTime: 0, // 캐시된 데이터를 유지하지 않음
    refetchOnWindowFocus: false, // 창이 포커스될 때 재조회하지 않음
    refetchOnMount: true, // 컴포넌트가 마운트될 때마다 재조회
    enabled: !!authHeader && !!currentDate, // authHeader와 currentDate가 있을 때만 쿼리 실행
  });
};

export { useGetLogin };
