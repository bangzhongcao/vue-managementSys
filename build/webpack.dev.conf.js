'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const mysql = require('mysql');
// nodejs开发框架express，用来简化操作
const express = require('express')
// 创建node.js的express开发框架的实例
const app = express();

var bodyParser = require('body-parser');
// var multer = require('multer'); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
// 连接数据库配置
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'personlist'
});
 
connection.connect();


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app){
      // 登录
      app.post('/api/login', (req, res) => {
        var str="";
        req.on("data",function(chunk){
          str+=chunk;     
        });
        req.on("end",function(){
          var loginData = JSON.parse(str);
          var  sql = 'SELECT * FROM admins';
          connection.query(sql,function (err, result) {
            if(err){
              res.json({status:false,msg:err.message});
            }else{
              for(var i in result){
                if(result[i].AdminName===loginData.Name&&result[i].AdminPass===loginData.Pass){
                  var session=""; 
                  for(var i=0;i<6;i++) { 
                    session+=Math.floor(Math.random()*10); 
                  } 
                  res.json({status:true,session:session});
                }else{
                  res.json({status:false,msg:'账号或密码不正确'});
                }
              }
            }
          });
        });
        
      }),
      // 搜索
      app.get('/api/tableData', (req, res) => {
        var  sql = 'SELECT * FROM userinfo';
        connection.query(sql,function (err, result) {
          if(err){
            res.json({data:err.message});
            return;
          }
          res.json({data:result}); 
        });
      }),
      // 修改
      app.post('/api/alterItem', (req, res,next)=> {
        var modSqlParams = [];
        var str="";
        req.on("data",function(chunk){
          str+=chunk;     
        })
        req.on("end",function(){
          var jsonData = JSON.parse(str);
          for(var k in jsonData){
            modSqlParams.push(jsonData[k]);
          }
          var id = modSqlParams.shift();
          modSqlParams.push(id);
          var modSql = 'UPDATE userinfo SET userName = ?,IDcard = ?,userDepartment = ?,userStation = ?,userAge = ?,userSex = ? WHERE userId = ?';
          connection.query(modSql,modSqlParams,(err, result)=> {
            if(err){
              res.json({
                status:false,
                msg:err.message
              });
            }else{
              res.json({
                status: true
              });
            }
          });
        });
      }),
      // 新增
      app.post('/api/addItem', (req, res)=> { 
        var str="";
        req.on("data",function(chunk){
          str+=chunk;     
        });
        req.on("end",function(){
          var addSqlParams = JSON.parse(str);
          connection.query('insert into userinfo set ?',addSqlParams,function (err, result) {
              if(err){
                res.json({
                  status:false,
                  msg:err.message
                });
              }else{
                res.json({
                  status: true
                });
              }
          });
        });
      }),
      // 删除
      app.post('/api/deleteItem', (req, res)=> {
        var str="";
        req.on("data",function(chunk){
          str+=chunk;     
        });
        req.on("end",function(){
          var jsonData = JSON.parse(str);
          var deltSql = 'DELETE FROM userinfo where userId=?';
          var deleteSqlParams=[jsonData['userId']];
          connection.query(deltSql,deleteSqlParams,function (err, result) {
              if(err){
                res.json({
                  status:false,
                  msg:err.message
                });
              }else{
                res.json({
                  status: true
                });
              }   
          });
        });
      });
    },
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
