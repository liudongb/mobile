const path = require("path");

const isProduction = process.env.NODE_ENV === "production" ? true : false; // 判断是否为生产环境
const PUBLIC_PATH = isProduction ? "./" : "/";

const API = process.env.VUE_APP_PROXY_API;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: PUBLIC_PATH,
  // ----------- 添加打包方式 ------------
  productionSourceMap: !isProduction, // 不生成map
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "/src/assets/style/vant.less";`
          }
        }
      }
    }
  },

  // configureWebpack: config => {
  //   if (isProduction) {
  //     config.plugins.push(
  //       new TerserPlugin({
  //         terserOptions: {
  //           compress: {
  //             drop_console: true
  //           }
  //         }
  //       })
  //     );
  //   }
  // },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "酒店隔离系统";
      return args;
    });
    config.when(isProduction, (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          vantUI: {
            name: "chunk-vantUI", // 单独将 vantUI 拆包
            priority: 20, // 数字大权重高，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          },
          commons: {
            name: "chunk-comomns",
            test: resolve("src/components"), // 可自定义拓展你的规则
            minChunks: 2, // 最小共用次数
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
    });
  },
  // -------------- 打包方式 end -----------
  devServer: {
    port: 8081,
    proxy: {
      [API]: {
        target: "http://192.168.0.133:8082/",
        // target: "http://192.168.0.120:8082/",
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          ["^" + API]: "/" + API
        }
      }
    }
    // proxy: { 
    //   '/nsjdgl/*': { 
    //     // target: "http://192.168.0.133:8082/", 
    //     target: "http://192.168.0.120:8082/", 
    //     changeOrigin: true, 
    //     ws: true, 
    //     secure: false, 
    //     pathRewrite: { 
    //       '^/nsjdgl': "/nsjdgl" 
    //     } 
    //   } 
    // }
  }
};
