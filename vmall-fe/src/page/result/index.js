/*
* @Author: Rosen
* @Date:   2017-05-19 21:52:46
* @Last Modified by:   Rosen
* @Last Modified time: 2017-06-10 21:24:36
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _vm = require('util/vm.js');

$(function(){
    var type        = _vm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber  = _vm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示元素
    $element.show();
})
