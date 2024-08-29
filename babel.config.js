module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "@": "./src",
          "@apis": "./src/apis",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@navigations": "./src/navigations",
          "@screens": "./src/screens",
          "@styles": "./src/styles",
          "@types": "./src/types",
        },
      },
    ],
  ],
};
