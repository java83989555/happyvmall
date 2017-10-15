const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //生成独立的css
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量的配置 dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log('当前环境:' + WEBPACK_ENV);

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    title       : title,
    inject: true,
    hash: true,
    chunks: ['common', name]//数组存放的倒入html的js名字，当前设置为引用common.js和与html文件名相同的js
  };
}

// webpack congig
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
    'result': ['./src/page/result/index.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist',
    filename: 'js/[name].js'
  },
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image'
    }
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=100&name=/resource/[name].[ext]'
      },
      {
          test: /\.string$/,
          loader: 'html-loader',
          query : {
              minimize : true,
              removeAttributeQuotes : false
          }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    // 独立通用模块的插件到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: 'js/base.js'
    }),
    // 独立css的到插件里
    new ExtractTextPlugin("css/[name].css"),
    // html模版到处理
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login','登陆页')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果页')),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    quiet: false, //控制台中不输出打包的信息
    noInfo: false,
    hot: true, //开启热点
    inline: true, //开启页面自动刷新
    lazy: false, //不启动懒加载
    progress: true, //显示打包的进度
    watchOptions: {
      aggregateTimeout: 300
    },
    host: 'localhost',
    port: '8070', //设置端口号//其实很简单的，只要配置这个参数就可以了
    proxy: {
      '/api/*': {
        target: 'http://localhost:8070',
        changeOrigin: true,
        secure: false
      }
    }
  }

};
// 测试环境则追加
if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://loaclhost:8088');
}
module.exports = config;
