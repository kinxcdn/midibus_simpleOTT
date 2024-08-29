import { instance } from "../instance";

import { storage } from "@/constants/storage";

const channelId = storage.getString("channelId");
console.log(channelId);

/*
 * 전체 태그 검색
 */
const getTagsByKeyword = async (keyword: string) => {
  const response = await instance.get(
    `/v2/channel/${channelId}/tag?keyword=${keyword}`
  );

  return response.data?.tag_list || [];
};

/*
 * 전체 미디어 검색
 */
const getObjectsByKeyword = async (keyword: string) => {
  const response = await instance.get(
    `/v2/channel/${channelId}?keyword=${keyword}`
  );
  return response.data?.object_list || [];
};

export { getTagsByKeyword, getObjectsByKeyword };
