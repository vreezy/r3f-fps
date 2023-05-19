/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.(png|jpg|glb|gltf|bin|fbx|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg|wav)$/i,
      use: {
        loader: "raw-loader",
        options: {
          esModule: false,
        },
      },
      //exclude: path.resolve(__dirname, "./node_modules/"),
    });
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
