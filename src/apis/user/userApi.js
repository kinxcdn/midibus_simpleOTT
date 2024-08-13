import * as config from "../../constants/properties";
import axios from "axios";

/*
 * 유저 로그인 로직
 */
const getLogin = async (authHeader, currentDate) => {
  try {
    const response = await axios.get(
      `${config.MIDIBUS_API}/v2/token?expire=${currentDate}`,
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

export { getLogin };
