import { instance } from "../instance";
import * as config from "../../constants/properties";

/*
 * 전체 태그 검색
 */
const getTagsByKeyword = async (keyword: string) => {
  const response = await instance.get(
    `/v2/channel/${config.CHANNEL}/tag?keyword=${keyword}`
  );

  return response.data?.tag_list || [];
};

/*
 * 전체 미디어 검색
 */
const getObjectsByKeyword = async (keyword: string) => {
  const response = await instance.get(
    `/v2/channel/${config.CHANNEL}?keyword=${keyword}`
  );
  return response.data?.object_list || [];
};

export { getTagsByKeyword, getObjectsByKeyword };
