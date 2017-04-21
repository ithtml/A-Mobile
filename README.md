# A-Mobile 手机mip专题框架模板

### 目录结构

A-MOBILE \n
|—— dist        产出目录 \n
|
|—— Public      公共目录（head，foot，images，css）\n
|
|—— src         HTML源码目录\n
     |—— images     图片文件夹\n
     |—— css.less   less样式表\n
     |—— index.htm  html源文件\n
|
| gulpfile.js   gulp配置文件\n
| package.json  package配置文件\n


### 使用说明

  专题在src（HTML源码目录）中编写，样式表写在css.less中\n

gulp\n
\n
  首先安装nodejs，并全局安装gulp\n
  npm install 安装所有插件\n

  常用命令：\n
  gulp --dir #专题目录# 构建专题并预览\n
  \n
  gulp out --dir #专题目录# 将完成的专题产出 产出后的专题在 dist/ 中，上传到服务器即可\n
