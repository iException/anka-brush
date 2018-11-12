# 介绍

* 这是一款为简化小程序里canvas画图操作而创建的一个canvas相关的工具库，主要功能包括如下：

1. 基本上将小程序中canvas相关的api都封装了一层，方便开发者链式调用。

2. canvas相关api中传的宽高、字体大小等参数直接传设计稿系数即可，不需要自己再做转换。

3. 常用功能，如：圆形图，圆角图等操作都进行了封装，提供接口调用。

# 安装

* npm  install @anka-dev/brush


# 在小程序中使用

0. 如果是第一次在小程序中使用npm包，那么先需要npm init，然后再按小程序官网的流程操作一遍，[点我](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)去查看小程序中npm教程

0. 小程序中npm构建之后在对应需要使用小程序canvas功能的js页面中在page({})前引入，const Brush = require('@anka-dev/brush')即可。

0. 然后在需要用到canvas中的某些功能时直接使用const brush = new Brush(canvasId)构造函数中传入的是canvas的id，如果在组件中使用需要将this传入const brush = new Brush(canvasId, this)。

# 主要API

* 绘制图像到画布。
* `brush.drawImage(string imageResource, number dx, number dy, number dWidth, number dHeight, number sx, number sy, number sWidth, number sHeight)`
* 使用方式完全和小程序不同之处必须将每个参数都传入，不可以省略参数(9个参数都需要传入）

* 参数说明
* [点我](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.drawImage.html),传入的参数不需要经过rpx和px转换

* 示例代码
```
const Brush = require('@anka-dev/brush')
const brush = new Brush(canvasId) 
brush.drawImage(imgUrl, 0, 0, img.width, img.height, 0, 0, 750, 1221).draw()
```

* 绘制圆形图片到画布。
* `brush.drawRoundImage(数组1, 数组2)`
* 使用方式完全和小程序不同之处必须将每个参数都传入，不可以省略参数(9个参数都需要传入）

* 参数说明
* 数组1和wx.arc的参数一致，[参数介绍](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.drawImage.html)
* 数组2和wx.drawImage的参数一致，[参数介绍](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.arc.html)

* 示例代码
```
const Brush = require('@anka-dev/brush') 
const brush = new Brush(canvasId)
brush.drawRoundImage(
   [圆心x轴的坐标, 圆心y坐标, 半径长度, 开始角度, 结束角度, 弧度的方向是否是逆时针],
   [图片url, 图像的左上角在目标canvas上x轴的位置, 图像的左上角在目标canvas上y轴的位置, 绘制图像的宽度, 绘制图像的高度, 图片在canvas上显示的x坐标, 图片在canvas上显示的y坐标, 图片在canvas上显示的宽, 图片在canvas上显示的高]).draw()
```

* 绘制圆角矩形路径。
* `brush.drawRoundRect(X, Y, width, height, round)`

* 参数说明
* X为圆角矩形在canvas上的距离左上角x的坐标值
* Y为圆角矩形在canvas上的距离左上角y的坐标值
* width为圆角矩形在canvas上的宽
* height为圆角矩形在canvas上的高
* round为圆角矩形的圆角，默认值为0

* 示例代码
```
const Brush = require('@anka-dev/brush')
const brush = new Brush(canvasId)
brush.drawRoundRect(220, 220, 236, 250).draw()
```

* 绘制矩形圆角图片到画布。
* `brush.drawRoundRectImage(数组1, 数组2)`

* 参数说明
* 数组1 = [距离画布左上角x坐标值, 距离画布左上角y坐标值, 矩形宽度, 矩形高度, 圆角弧度]  （和上面drawRoundRect传入参数一致）
* 数组2 = drawImage的传入参数一致
* width为圆角矩形在canvas上的宽2

* 示例代码
```
const Brush = require('@anka-dev/brush') 
const brush = new Brush(canvasId)
brush.drawRoundRectImage(
                [265, 430, 220, 220, 24],
                [res.path, xStart, Ystart, res.width, res.height, 265, 430, 220, 220]
            )
```

# 其他API
### 使用方式和传入参数基本和小程序相同，只是分装了一层方便链式调用
* 创建一个矩形路径。
* `brush.rect(number x, number y, number width, number height)`
* 使用方式完全和小程序中完全一致

* 参数
* number x
* 矩形路径左上角的横坐标，不需要再将rpx转换成px。

* number y
* 矩形路径左上角的横坐标，不需要再将rpx转换成px。

* number width
* 矩形路径的宽度，不需要再将rpx转换成px。

* number height
* 矩形路径的高度，不需要再将rpx转换成px。

* 示例代码
```
const Brush = require('@anka-dev/brush')
const brush = new Brush(canvasId) 
brush.rect(10, 10, 150, 75).setFillStyle('red').fill().draw()
```
[查看更多API](https://github.com/iException/anka-brush/blob/master/index.js)
