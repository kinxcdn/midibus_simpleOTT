import { instance } from "../instance";

import { storage } from "@/constants/storage";

/*
 * 전체 태그 검색
 */
const getTagsByKeyword = async (channelId?: string, keyword?: string) => {
  const response = await instance.get(
    `/v2/channel/${channelId}/tag?keyword=${keyword}`
  );

  return response.data?.tag_list || [];
};

/*
 * 전체 미디어 검색
 */
const getObjectsByKeyword = async (channelId?: string, keyword?: string) => {
  const response = await instance.get(
    `/v2/channel/${channelId}?keyword=${keyword}`
  );
  return response.data?.object_list || [];
};

export { getTagsByKeyword, getObjectsByKeyword };
