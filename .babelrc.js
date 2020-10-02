module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@action': './src/redux/action',
          '@reducer': './src/redux/reducer',
          '@services': './src/services',
          '@constants': './src/constants',
          '@interfaces': './src/interfaces',
          '@routes': './src/routes'
        }
      }
    ]
  ]
};
