module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-redux|@reduxjs|redux-persist|@react-navigation|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context|@react-native-async-storage|immer)/)',
  ],
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
