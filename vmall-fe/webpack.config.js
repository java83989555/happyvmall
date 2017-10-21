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
    'list': ['./src/page/list/index.js'],
    'detail': ['./src/page/detail/index.js'],
    'cart': ['./src/page/cart/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'user-center': ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
    'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
    'user-pass-update': ['./src/page/user-pass-update/index.js'],
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
      node_modules: __dirname + '/node_modules',
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
    new HtmlWebpackPlugin(getHtmlConfig('user-login','登陆页面')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','注册页面')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
    new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
    new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
    new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','用户中心更新')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','用户密码重置')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','用户密码更新')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果页')),
  ],
  // 代理转发
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
