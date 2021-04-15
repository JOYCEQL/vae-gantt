<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-09 16:20:23
 * @LastEditTime: 2021-04-14 14:49:43
 * @LastEditors: yuguangzhou
 * @Description:
-->
<template>
    <div id="gantt" style="width: 98%; height: 600px"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'yu-Gantt',
  props: {
    baseDate: {
      type: String,
      default: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
    },
    intervalHour: {
      type: Array,
      default: () => []
    },
    ganttData: {
      type: Array,
      default: () => []
    }

  },
  data () {
    return {
      roomData: []
    }
  },
  created () {
    // 处理ganttData得到纵轴数据--根据index排序
    const sortResult = this.ganttData.sort((a, b) => a.value[0].index - b.value[0].index)
    const roomData = sortResult.map(item => item.value[0].roomName)
    this.roomData = roomData
  },
  mounted () {
    this.myEcharts()
  },
  methods: {
    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      this.$echarts.init(document.getElementById('gantt')).dispose()
      var myChart = this.$echarts.init(document.getElementById('gantt'))
      // 指定图表的配置项和数据
      var option = {
        color: '#0A8BFF',
        backgroundColor: '#fff',
        title: {
          // subtext: '不同日期的当日工时统计'
        },
        tooltip: {
          // enterable: true,
          trigger: 'item',
          show: true,
          //   axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          //     type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          // },
          // alwaysShowContent: true,
          hideDelay: 100,
          backgroundColor: 'rgba(255,255,255,1)', // 背景颜色（此时为默认色）
          borderRadius: 5, // 边框圆角
          textStyle: {
            color: '#000'
          },
          formatter: function (params) {
            const item = params.data.value[0]
            // return item.roomName + '<br/>' + item.content + '<br/>' + item.startTime + ' - ' + item.endTime
            return item.content + '<br/>' + item.startTime + ' - ' + item.endTime
          }

          // position: function (point, params, dom, rect, size) {
          //   console.log(params)
          //   document.querySelector('dom').html = '<div style="font-size:14px;color:rgba(0,0,0,0.65)" class="tip"><h1 style="font-size:14px;color:rgba(0,0,0,0.85);height:25px;display:flex;align-items: center;padding:0 0 5px 8px;margin:0;border-bottom:1px solid rgba(0,0,0,0.06);font-weight:bold">' +
          //     params.name.split(',')[0] + '</h1> <p style="margin:0;padding:0 8px 0 8px;height:25px;display:flex;align-items: center;">时段:' +
          //     params.value[1].split(' ')[1] + '~' + params.value[2].split(' ')[1] +
          //     ' </p><p style="margin:0;padding:0 8px 0 8px;height:25px;display:flex;align-items: center;">总工时:' + params.name.split(',')[1] +
          //     ' </p></div>'
          // }
        },
        legend: {
          left: '90px',
          // bottom: '1%',
          bottom: '1%',
          show: true,
          formatter: function (item) {
            return item
          }
        },
        grid: {
          // 绘图网格
          left: '2%',
          right: '3%',
          top: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          position: 'top',
          interval: 3600 * 1000, // 以一个小时递增
          // max:`${this.baseDate} 24:00`,
          max: `${this.baseDate} ${this.intervalHour[1]}`, // 设置最大时间为18点
          // min:`${this.baseDate} 00:00`, //将data里最小时间的整点时间设为min,否则min会以data里面的min为开始进行整点递增
          min: `${this.baseDate} ${this.intervalHour[0]}`, // 将data里最小时间的整点时间设为min,否则min会以data里面的min为开始进行整点递增
          axisLabel: {
            interval: 0,
            formatter: function (value, index) {
              var data = new Date(value)
              var hours = data.getHours()
              return hours + ':00'
            },
            textStyle: {
              color: 'rgba(0,0,0,0.65)', // 更改坐标轴文字颜色
              fontSize: 14 // 更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e5e5e5'
            },
            onZero: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        dataZoom: [
          // 设置滚动条
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0, 1],
            left: '96%',
            start: 1,
            end: 100,
            fiterMode: 'filter'
          },
          {
            type: 'inside',
            fiterMode: 'filter',
            yAxisIndex: [0, 1],
            start: 1,
            end: 100

          }
        ],
        yAxis: {
          inverse: true, // 是否反转
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#e5e5e5'
            }
          },
          data: this.roomData,
          axisLabel: {
            textStyle: {
              color: 'rgba(0, 0, 0, 0.65)', // 刻度颜色
              fontSize: 14 // 刻度大小
            },
            formatter: function (value) {
              const a = value.split(',')[0]
              return a + '{a|' + '\n' + '}'
            },
            rich: {
              a: {
                color: 'rgba(24, 144, 255, 0.7)',
                fontSize: 12
              }
              // b: {
              //     color: 'red',
              //     fontSize:14,
              // }
            }
          }
        },
        series: [
          {
            type: 'custom',
            clickable: false,
            renderItem: function (params, api) {
              // 开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
              // var categoryIndex = api.value(0).index // 这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
              var categoryIndex = api.value(0).index
              var start = api.coord([api.value(0).startTime, categoryIndex]) // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
              var end = api.coord([api.value(0).endTime, categoryIndex])

              var height = 40
              return {
                type: 'rect', // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                shape: echarts.graphic.clipRectByRect({
                  // 矩形的位置和大小。
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
                }, {
                  // 当前坐标系的包围盒。
                  x: params.coordSys.x,
                  y: params.coordSys.y,
                  width: params.coordSys.width,
                  height: params.coordSys.height
                }),
                style: api.style()
              }
            },
            label: {
              normal: {
                show: true,
                position: 'insideBottom',
                formatter: function (params) {
                  return params.value[0].content
                },
                textStyle: {
                  align: 'center',
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: '30' // 解决y轴 label击穿的问题
                }
              }
            },
            encode: {
              x: [1, 2], // data 中『维度1』和『维度2』对应到 X 轴
              y: 0 // data 中『维度0』对应到 Y 轴
            },

            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.value[0].status === 'in') return '#4dc394'
                  if (params.value[0].status === 'out') return '#ddb30b'
                }
              }
            },
            // dataZoom: [
            //   {
            //     show: true,
            //     realtime: true,
            //     start: 0,
            //     end: 50
            //   }
            // ],
            data: this.ganttData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      console.log(option.series[0].data)
      window.onresize = function () {
        myChart.resize()
      }
      myChart.getZr().on('mousemove', param => {
        var pointInPixel = [param.offsetX, param.offsetY]
        if (myChart.containPixel('grid', pointInPixel)) {
          // 若鼠标滑过区域位置在当前图表范围内 鼠标设置为小手
          // myChart.getZr().setBackgroundColor('red')
          myChart.getZr().setCursorStyle('pointer')
        } else {
          myChart.getZr().setCursorStyle('default')
        }
      })
      // 任意位置点击事件----注册双击
      myChart.getZr().on('click', params => {
        if (!params.target) {
        // 点击在了空白处，做些什么。
          const point = [params.offsetX, params.offsetY]
          if (myChart.containPixel('grid', point)) {
          // 获取被点击的点在y轴上的索引
            const idxArr = myChart.convertFromPixel({ seriesIndex: 0 }, point)
            const xValue = new Date(+idxArr[0]).getHours()
            const yValue = idxArr[1]
            const sendData = [xValue, yValue]
            this.$emit('getInfoCallback', sendData)
          }
        }
      })
      // 图例点击事件-返回数据给父组件---单击事件
      myChart.on('click', params => {
        this.$emit('getInfoCallback', params.data.value)
      })
    }
  },
  computed: {

  }
}
</script>

<style scoped lang="less">

</style>
