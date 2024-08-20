/*
* 업로드한 파일
* 현재기준으로 1분 전이면 -> 방금전
* 1시간 전 -> 현재시간 기준으로 몇분 전
* 24시간 전 -> 현재시간 기준으로 몇시간 전
* 하루를 넘어간다면 몇일 전을 보여줌
*/
export const uploadTimeAgo = (createdAt) => {
  const now = new Date();
  const year = createdAt.substring(0, 4);
  const month = createdAt.substring(4, 6) - 1; 
  const day = createdAt.substring(6, 8);
  const hour = createdAt.substring(8, 10);
  const minute = createdAt.substring(10, 12);
  const second = createdAt.substring(12, 14);

  const createdDate = new Date(year, month, day, hour, minute, second);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (minutes < 1) return `방금 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
};
