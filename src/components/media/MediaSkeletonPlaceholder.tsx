import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { SIZES } from "@/styles/theme";

const MediaSkeletonPlaceholder = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#2a2a2a" // 배경색 변경
      highlightColor="#444" // 하이라이트 색 변경
      borderRadius={4}
    >
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={SIZES.width - 45}
              height={40}
              borderRadius={4}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item
              marginTop={10}
              width={100}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={10}
              width={100}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={10}
              width={200}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              marginTop={15}
            >
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={6}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={6}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={6}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={6}
                marginRight={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default MediaSkeletonPlaceholder;
