# A-Mobile 手机mip专题框架模板

### 目录结构

A-MOBILE 

|—— dist        产出目录 
|
|—— Public      公共目录（head，foot，images，css）
|
|—— src         HTML源码目录
     |—— images     图片文件夹
     |—— css.less   less样式表
     |—— index.htm  html源文件
|
| gulpfile.js   gulp配置文件
| package.json  package配置文件


### 使用说明

  专题在src（HTML源码目录）中编写，样式表写在css.less中

gulp

  首先安装nodejs，并全局安装gulp
  npm install 安装所有插件

  常用命令：
  gulp --dir #专题目录# 构建专题并预览
  
  gulp out --dir #专题目录# 将完成的专题产出 产出后的专题在 dist/ 中，上传到服务器即可
