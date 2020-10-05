const path=require('path');
module.exports = {
  //基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  //输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  //eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  chainWebpack: config => { } /*  */,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  //   // // 开启 CSS source maps?
  //   sourceMap: false,
  //   // // css预设器配置项
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "./src/styles/main.scss";`
  //     }
  //   },
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // },
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack配置 - 简单配置方式
  configureWebpack: {
    resolve: {
      extensions: ['js','css','vue'],   //自动添加后缀名
      alias: {
        // 别名
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components"),
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hot: true,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => { }
  },

  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
