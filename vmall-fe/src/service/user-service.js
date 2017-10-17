/*
* @Author: Rosen
* @Date:   2017-05-17 17:04:32
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-24 17:11:19
*/

'use strict';

var _vm = require('util/vm.js');

var _user = {
    // 用户登录
    login : function(userInfo, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/login'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查用户名
    checkUsername : function(username, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/check_valid'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 用户注册
    register : function(userInfo, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/register'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/get_user_info'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户密码提示问题
    getQuestion : function(username, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/forget_get_question'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/forget_check_answer'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 重置密码
    resetPassword : function(userInfo, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/forget_reset_password'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/get_information'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/update_information'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登录状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/reset_password'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _vm.request({
            url     : _vm.getServerUrl('/api/user/logout'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _user;
