import Vue from 'vue'

// import * as echarts from "echarts";
//按需加载  减小包体积
let echarts = require('echarts/lib/echarts')  //echart主模块，必须引入
require('echarts/lib/component/tooltip')  //echart基础配置，必须引入
require('echarts/lib/component/title')  //echart基础配置，必须引入
require('echarts/lib/component/dataZoom')  //横向滚动条
require('echarts/lib/component/grid')  //echart基础配置，必须引入
require('echarts/lib/component/toolbox')  //echart基础配置，必须引入
require('echarts/lib/component/legend')  //echart基础配置，必须引入
require('echarts/lib/component/legendScroll')  //echart基础配置，必须引入 图例滚动
require('echarts/lib/chart/bar') // 柱状图自己需要什么就去找
require('echarts/lib/chart/pie') // 饼状图
require('echarts/lib/chart/line') // 折线图

Vue.prototype.$echarts=echarts 