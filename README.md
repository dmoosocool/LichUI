---

title: LichUI 介绍
date: 2017-08-30 10:13
author: dmoo.

---

# LichUI介绍

## LichUI是什么
```
LichUi是一套为Lich.js提供UI组件化的UI框架. zepto/lodash + less + Flexiable + iconfont.
使用gulp将编写的源码打包成LichUI.js|LichUI.css. 
可通过npm引用也可直接在页面中引用.
```

## 为什么要写LichUI
```
为了让Lich.js支持组件化UI, 传统的页面开发方式代码复用率太低. 大量代码Ctrl+C + Ctrl+V 维护成本太高.
使用LichUI组件化可以将一些可以复用的样式、组件单独开发. 可以为多个项目同时使用. 
```

## 如何使用LichUI

### 启动脚本
```shell
npm start //本地会默认起个localhost:12345 根目录为/dist的服务.通过这个服务可以很方便的调试你写的组件.
```

### 如何开发一个组件
- 首先应该根据设计图分析出那些东西是可以单独公共出来的组件或者是UI样式.
- 根据设计图的宽度去调整flexiable的缩放. (具体在flexiable.debug.js 73行)
- 页面中的长度宽度可以使用less中提供的px2rem方法调用, (注意: 例如 border-border:1px solid #ccc; 这种情况不建议使用px2rem会引发移动端1px的问题.)
- 开发组件时应该考虑好参数的通用性及使用性.

## LichUI的优势

- 因为使用zepto+lodash所以学习曲线几乎为零
- flexiable可以较优雅的解决移动端兼容性
- 易上手, 低成本维护, 可扩展性高
- 一次开发, 多项目可应用


## 目录结构
```
.
├── README.md                   项目说明
├── designs                     设计图. sketch导出的html目录
├── dist                        输出目录
│   ├── component
│   ├── example.css
│   ├── form
│   ├── index.html
│   └── lib
├── example                     案例
│   ├── component               组件
│   ├── example.less            案例样式
│   └── index.html              案例首页
├── gulpfile.babel.js           gulpfile
├── package.json                npm包管理文件
├── src                         主目录
│   ├── components              组件
│   ├── core                    核心工具类及样式
│   └── lib                     引用外部库
└── tasks                       gulp脚本目录
    ├── _config                 配置目录
    ├── build.js                构建脚本
    └── dev.js                  运行环境脚本
```