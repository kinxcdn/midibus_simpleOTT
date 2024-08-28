interface PlayData {
  mediaPlayTime: number;
  play100: number;
  play20: number;
  play40: number;
  play60: number;
  play80: number;
  totalCount: number;
}

interface MediaPlayInfo {
  objectId: string;
  playData: PlayData;
}

interface LatestUploadsMediaListProps {
  channelId?: string;
  limit: number;
}

interface TagMediaListProps {
  channelId?: string;
  categorizedId: string;
}

interface LimitTagMediaListProps {
  channelId?: string;
  limit: number;
  categorizedId: string;
}

interface PlayTopNMediaListProps {
  objectList: MediaPlayInfo[]; // 객체 배열로 정의
  channelId?: string;
}

export type {
  LatestUploadsMediaListProps,
  LimitTagMediaListProps,
  TagMediaListProps,
  PlayTopNMediaListProps,
};
