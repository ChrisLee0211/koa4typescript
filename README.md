# koa4typescript

## 一、项目说明
以koa2+typescript为基础搭建的简单骨架，支持es2017语法及koa常用中间件的类型声明，集成了以下功能：
> - cors跨域处理
> - redis连接工具及常用读写操作方法
> - mongodb连接工具以及常用读写方法
> - 支持websocket
> - 配置了log4js作为日志中间件
> - 支持开发模式热重载
> - 内置了简单的dockerfile配置，方便构建镜像使用
> - 开发与生产配置分离

## 二、使用方法

有可能会出现socket.io的ts声明文件找不到的报错，手动`npm install @types/socket.io`即可
```
npm install
```
进入开发模式，支持保存热更新

```
npm run dev
```
构建项目

```
npm run build
```

