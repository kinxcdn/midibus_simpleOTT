import { LoginProps } from "types/apis/userTypes";
import axios from "axios";

import { instance } from "../instance";

/*
 * 유저 로그인 로직
 */
const getLogin = async ({ authHeader, currentDate }: LoginProps) => {
  try {
    console.log(process.env.MIDIBUS_API);
    const response = await axios.get(
      `${process.env.MIDIBUS_API}/v2/token?expire=${currentDate}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return response.data;
  } catch {
    console.log(new Error("api 연동 오류 - getLogin 실패"));
  }
};

const getChannelList = async () => {
  try {
    const response = await instance.get("/v2/channel");
    const channelList = response.data?.channel_list;

    return Array.isArray(channelList) && channelList.length > 0
      ? channelList
      : [];
  } catch {
    console.log(new Error("api 연동 오류 - getChannelList 실패"));
  }
};

export { getLogin, getChannelList };
