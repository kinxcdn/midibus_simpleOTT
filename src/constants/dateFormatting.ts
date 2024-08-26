// 요청에서 받은 데이터 전처리 로직
export const dateFormatting = (dateTimeString: string) => {
  if (!dateTimeString || dateTimeString.length !== 14) {
    return dateTimeString;
  }

  const year = dateTimeString.substring(0, 4);
  const month = dateTimeString.substring(4, 6);
  const day = dateTimeString.substring(6, 8);
  const hour = dateTimeString.substring(8, 10);
  const minute = dateTimeString.substring(10, 12);
  const second = dateTimeString.substring(12, 14);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
