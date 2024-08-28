import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SIZES } from "../../styles/theme";
import { View } from "react-native";

const SearchSkeletonPlaceholder = () => {
  return (
    <View style={{ flex: 1, height: SIZES.height }}>
      <SkeletonPlaceholder backgroundColor="#2a2a2a" highlightColor="#444">
        <SkeletonPlaceholder.Item marginLeft={20} marginTop={20}>
          <SkeletonPlaceholder.Item
            width={SIZES.width - 45}
            height="82%"
            borderRadius={20}
            marginBottom={20}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SearchSkeletonPlaceholder;
