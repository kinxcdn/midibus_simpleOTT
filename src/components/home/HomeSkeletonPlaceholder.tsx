import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SIZES } from "@/styles/theme";

const HomeSkeletonPlaceholder = () => {
  return (
    <>
      <SkeletonPlaceholder
        backgroundColor="#2a2a2a" // 배경색 변경
        highlightColor="#444" // 하이라이트 색 변경
        borderRadius={4}
      >
        <SkeletonPlaceholder.Item marginLeft={20} marginTop={20}>
          <SkeletonPlaceholder.Item
            width={150}
            height={20}
            borderRadius={4}
            marginBottom={10}
          />
          <SkeletonPlaceholder.Item
            width={250}
            height={30}
            borderRadius={4}
            marginBottom={10}
          />
          <SkeletonPlaceholder.Item
            width={SIZES.width - 40}
            height="26%"
            borderRadius={4}
            marginBottom={20}
          />
          <SkeletonPlaceholder.Item
            width={250}
            height={30}
            borderRadius={4}
            marginBottom={10}
          />
          <SkeletonPlaceholder.Item
            width={SIZES.width - 40}
            height="26%"
            borderRadius={4}
            marginBottom={20}
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
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            marginTop={20}
          >
            <SkeletonPlaceholder.Item
              width={180}
              height={120}
              borderRadius={6}
              marginRight={10}
            />
            <SkeletonPlaceholder.Item
              width={180}
              height={120}
              borderRadius={6}
              marginRight={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </>
  );
};

export default HomeSkeletonPlaceholder;
