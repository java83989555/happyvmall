### 定义
1. js的服务端运行环境

### 用途
1. 构建工具webpack的环境依赖

### 特点
1. 单线程
2. 异步编程

### 应用场景
1. 低运算
2. 高I/O

### npm
1. node.js的包依赖管理工具（maven）
  * 初始化
    1. `npm init` ->`输入参数`->`生成package.json`
    2. 安装`npm install xxx@xxx`
    3. 卸载`npm uninstall xxx@xxx`
    4. 参数`-g`全局安装
    5. 参数`--registry=https://registry.npm.tobao.org`设置仓库源地址
2. 相关知识
  * npm 优先查找项目本地的包，找不到时候找全局的
  * 安装末尾加入`--save-dev `将开发用到的包信息放入`package.json`文件中，这样可以记住项目的依赖`devDependencies`下
  * 安装末尾加入`--save `将线上用到的包信息放入`package.json`文件中，这样可以记住项目的依赖`dependencies`下
#### webpack
1. 设计思想
  * **require anything** 将前端涉及的所有文件都通过require组织起来，最后以js为入口
2. 加载方式
  * 各种loader插件
3. 编译方式
  * 使用node.js将commonjs规范模块->funcation类型模块
4. 是什么？
  * WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用
5. 为什要使用WebPack？
  * 模块化，让我们可以把复杂的程序细化为小的文件;
  * 类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能能装换为JavaScript文件使浏览器可以识别；
  c:scss，less等CSS预处理器
6. 安装
  * `npm install webpack -g `全局安装
  * `npm install webpack@1.15.0 --save-dev `开发依赖
7. 配置文件
  * `webpack.config.js`核心内容，最终是json的配置文件
    * entry js的入口文件，主要存放源文件中js的路径
    * externals 外部依赖的声明
    * output 目标文件的内容
    * resolve 配置别名
    * module 各种文件，各种loader
    * plugins 插件
8. webpack loaders 常用的如下
  * html  `html-webpack-plugin/html-loader`
  * js  `babel-loader`+`babel-preset-es2015`
  * css `style-loader`+`css-loader`
  * image+font  `url-loader`
9. 常用命令
  * webpack 以不压缩的形式打包
  * webpack-p 线上发布时的打包将所有文件都进行最小化的压缩
  * webpack--watch 监听文件的改变而自动编译开发时常使用
  * webpack--config webpack.config.js 修改默认配置文件
  * webpack-dev-server
    * **前端文件服务器**:启动后可以使用`localhost`形式来访问网页，
    * **特色**:监听文件的改变然后自动刷新浏览器
    * **安装**:`npm install webpack-dev-server --save-dev`需要全局个局部安装，注意选择版本问题
    * **配置**:`webpack-dev-server/client?http://localhost:8088`打包入业务代码，需要全局代码引入所有要放入common入口中
    * **使用**:`webpack-dev-server --port 8088 --inline`命令启动server,inline作用是将client直接以脚本的方式插入页面
    * **优化**:由于冗长的启动命令比较繁琐，所以可利用npm的`script`加入命令
#### 如何使用WebPack组织项目实践
* 脚本的处理问题
  1. js 使用什么来加载？  
      * js自带的加载器即可  
  2. 如何配置多个entry入口加载js?
      * 以数组的方式引入entry
  3. output分目录配置目标文件的方法?
      * `js/[name].js`可以根据entry的key命名目标文件
  4. jquery的引入方法?
      * 配置`externals`在webpack.config.js文件中
  5. 如何抽取公共模块?
      * 依靠的`CommonsChunkPlugin`插件
* 样式的处理问题
  1. 样式使用什么loader?
      * `style-loader!css-loader`
  2. webpack如何将样式独立打包成css文件？
      * 需要使用插件`ExtractTextPlugin`百度简书上有详细的教程，需要注意版本问题，不指定版本如果启动不起来注意切换一个早期的版本，本次使用的是1.0.1
* 引入外部资源
  1.  `npm install html-webpack-plugin --save-dev`引入插件
