import { useQuery } from "@tanstack/react-query";
import { getTagsByKeyword, getObjectsByKeyword } from "../searchApi";

interface SearchResult {
  tagName?: string;
  resultType: "tag" | "media";
}

const useKeywordSearch = (channelId?: string, keyword?: string) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["keywordSearch", keyword],
    queryFn: async () => {
      const [tags, objects] = await Promise.all([
        getTagsByKeyword(channelId, keyword),
        getObjectsByKeyword(channelId, keyword),
      ]);

      const searchResultList: SearchResult[] = [];

      // 태그 검색결과 추가
      tags.forEach((tag: string) => {
        searchResultList.push({
          tagName: tag,
          resultType: "tag",
        });
      });

      // 미디어 검색 결과 추가
      objects.forEach((obj) => {
        obj.resultType = "media";
        searchResultList.push(obj);
      });

      return searchResultList;
    },
    enabled: !!keyword, // 쿼리는 keyword가 있을 때만 실행
  });

  return {
    data,
    isLoading,
  };
};

export { useKeywordSearch };
