/*
* @Author: Rosen
* @Date:   2017-05-17 18:55:04
* @Last Modified by:   Rosen
* @Last Modified time: 2017-06-02 17:51:15
*/

'use strict';

var _vm = require('util/vm.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/get_cart_product_count'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/add'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表
    getCartList : function(resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/list'),
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品
    selectProduct : function(productId, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/select'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选择购物车商品
    unselectProduct : function(productId, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/un_select'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 选中全部商品
    selectAllProduct : function(resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/select_all'),
            success : resolve,
            error   : reject
        });
    },
    // 取消选中全部商品
    unselectAllProduct : function(resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/un_select_all'),
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车商品数量
    updateProduct : function(productInfo, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/update'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteProduct : function(productIds, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/cart/delete_product'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _cart;
