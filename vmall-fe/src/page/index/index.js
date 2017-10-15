console.log('index.js say hello~~~~');


require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide=require('page/common/nav-side/index.js');
var _vm = require('util/vm.js');
navSide.init({
    name:'user-center'
  });
