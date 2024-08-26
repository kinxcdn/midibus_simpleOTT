export const uploadTimeAgo = (createdAt: string): string => {
  const now = new Date();

  const year = parseInt(createdAt.substring(0, 4), 10);
  const month = parseInt(createdAt.substring(4, 6), 10) - 1; // 월은 0부터 시작하므로 1을 빼줌
  const day = parseInt(createdAt.substring(6, 8), 10);
  const hour = parseInt(createdAt.substring(8, 10), 10);
  const minute = parseInt(createdAt.substring(10, 12), 10);
  const second = parseInt(createdAt.substring(12, 14), 10);

  const createdDate = new Date(year, month, day, hour, minute, second);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (minutes < 1) return `방금 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
};
