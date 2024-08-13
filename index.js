import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

AppRegistry.registerComponent(appName, () => App);
