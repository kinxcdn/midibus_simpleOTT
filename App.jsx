import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import StackNavigation from "./src/navigations/StackNavigator";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const App = () => {
  return (
    // QueryClientProvider로 애플리케이션을 감쌉니다.
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
