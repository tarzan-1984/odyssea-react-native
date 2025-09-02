module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/features': './src/features',
            '@/components': './src/components',
            '@/hooks': './src/hooks',
            '@/lib': './src/lib',
            '@/types': './src/types',
            '@/navigation': './src/navigation',
          },
        },
      ],
    ],
  };
};
