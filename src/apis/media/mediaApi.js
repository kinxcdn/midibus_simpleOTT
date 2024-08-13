import { instance } from "../instance";
import axios from "axios";
import * as config from "../../constants/properties";

/*
 * 최근 일주일동안 가장 많이 재생된 비디오
 */
const getMostWeeklyPlayedMediaList = async (channelId) => {
  try {
    // 7일 전 관련 로직
    const _7daysBeforeObj = new Date(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const _7daysBefore =
      _7daysBeforeObj.getFullYear().toString() +
      (_7daysBeforeObj.getMonth() + 1).toString().padStart(2, "0") +
      _7daysBeforeObj.getDate().toString().padStart(2, "0");

    const response = await axios.get(
      `${config.MIDIBUS_PLAY_API}/play/log/object?contentIds=${channelId}&from=${_7daysBefore}000000&to=20500331235959&amount=5&dataIndex=0`
    );

    const objectList = response.data;

    return Array.isArray(objectList) && objectList.length > 0 ? objectList : [];
  } catch {
    console.log(new Error("api 연동 오류 - mostWeeklyPlayedMediaList 실패"));
  }
};

/*
 * 최신 업로드 미디어 리스트
 */
const getLatestUploadsMediaList = async (channelId, limit) => {
  try {
    const response = await instance.get(
      `/v2/channel/${channelId}?limit=${limit}`
    );
    const objectList = response.data?.object_list;

    return Array.isArray(objectList) && objectList.length > 0 ? objectList : [];
  } catch {
    console.log(new Error("api 연동 오류 - getLatestUploadsMediaList 실패"));
  }
};

/*
 * 해당 미디어의 재생 수 가져오기
 */
const getObjectPlayCount = async (objectId) => {
  try {
    const response = await axios.get(
      `${config.MIDIBUS_PLAY_API}/play/count/${objectId}`
    );
    const playCount = response.data?.totalCount;

    // playCount가 유효한 경우 해당 값 반환, 그렇지 않으면 0 반환
    return playCount !== undefined && playCount !== null ? playCount : 0;
  } catch (error) {
    console.log(new Error("api 연동 오류 - getObjectPlayCount 실패"));
  }
};

/*
 * 태그로 조회한 미디어 리스트 가져오기
 */
const getTagMediaList = async (channelId, categorizedId) => {
  try {
    const response = await instance.get(
      `/v2/channel/${channelId}?tag=${categorizedId}`
    );
    const mediaList = response.data?.object_list;

    return Array.isArray(mediaList) && mediaList.length > 0 ? mediaList : [];
  } catch (error) {
    console.log(new Error("api 연동 오류 - getMediaListByTag 실패"));
  }
};

/*
 * 태그별 미디어 리스트 Limit 가져오기
 */
const getLimitTagMediaList = async () => {
  try {
    const response = await instance.get(
      `/v2/channel/${channelId}?limit=${limit}&tag=${tagId}`
    );
    const objectList = response.data?.object_list;

    return Array.isArray(objectList) && objectList.length > 0 ? objectList : [];
  } catch (error) {
    console.log(new Error("api 연동 오류 - getMediaListByTagLimit 실패"));
  }
};

/*
 * 최근 일주일동안 가장 많이 재생된 비디오
 */
const getPlayTopNMediaList = async (objectList, channelId) => {
  const mediaInfoPromises = objectList.map(async (item) => {
    const objectId = item.objectId;
    try {
      const response = await instance.get(
        `/v2/channel/${channelId}/${objectId}`
      );

      const objectInfo = response.data;
      return objectInfo && objectInfo.length !== 0 ? objectInfo : null;
    } catch (error) {
      console.error(`Error fetching info for object ID ${objectId}:`, error);
    }
  });

  const mediaInfoResults = await Promise.all(mediaInfoPromises);
  return mediaInfoResults.filter(Boolean);
};

export {
  getMostWeeklyPlayedMediaList,
  getLatestUploadsMediaList,
  getObjectPlayCount,
  getTagMediaList,
  getLimitTagMediaList,
  getPlayTopNMediaList,
};
