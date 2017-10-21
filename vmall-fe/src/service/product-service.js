/*
* @Author: Rosen
* @Date:   2017-05-27 18:26:52
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-29 16:54:03
*/

'use strict';

var _vm = require('util/vm.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/product/list'),
            data    : listParam,
            method    : 'post',
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/product/detail'),
            data    : {
                productId : productId
            },
            method    : 'post',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;
