import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SIZES } from "@/styles/theme";

const ChannelSkeletonPlaceholder = () => {
  return (
    <View style={{ flex: 1, height: SIZES.height - 100 }}>
      <SkeletonPlaceholder backgroundColor="#2a2a2a" highlightColor="#444">
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={SIZES.width - 50}
            height="20%"
            borderRadius={20}
            marginBottom={20}
          />
          <SkeletonPlaceholder.Item
            width={SIZES.width - 50}
            height="20%"
            borderRadius={20}
            marginBottom={20}
          />
          <SkeletonPlaceholder.Item
            width={SIZES.width - 50}
            height="20%"
            borderRadius={20}
            marginBottom={20}
          />
          <SkeletonPlaceholder.Item
            width={SIZES.width - 50}
            height="20%"
            borderRadius={20}
            marginBottom={20}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default ChannelSkeletonPlaceholder;
