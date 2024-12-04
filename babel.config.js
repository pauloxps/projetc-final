module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        "babel-preset-expo" // Preset para projetos Expo
      ],
      plugins: [
        "react-native-reanimated/plugin" // Necessário se você usar animações no React Native
      ],
    };
  };
  