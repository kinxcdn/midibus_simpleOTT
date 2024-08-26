import { instance } from "../instance";
import { TagListByObjectProps } from "types/apis/tagTypes";

/*
 * 전체 태그 리스트
 */
const getAllTags = async (channelId: string) => {
  try {
    const response = await instance.get(`/v2/channel/${channelId}/tag`);
    const tagList = response.data?.tag_list;

    return Array.isArray(tagList) && tagList.length > 0 ? tagList : [];
  } catch {
    console.log(new Error("api 연동 오류 - getAllTags 실패"));
  }
};

/*
 * 선택된 미디어(오브젝트)의 태그 리스트 가져오기
 */
const getTagListByObject = async ({
  channelId,
  objectId,
}: TagListByObjectProps) => {
  try {
    const response = await instance.get(
      `/v2/channel/${channelId}/${objectId}/tag`
    );
    const tagList = response.data?.tag_list;

    return Array.isArray(tagList) && tagList.length > 0 ? tagList : [];
  } catch (error) {
    console.log(new Error("api 연동 오류 - getTagListByObject 실패"));
  }
};

export { getAllTags, getTagListByObject };
