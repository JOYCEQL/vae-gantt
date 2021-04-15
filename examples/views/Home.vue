<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-13 17:12:17
 * @LastEditTime: 2021-04-14 14:51:36
 * @LastEditors: yuguangzhou
 * @Description:
-->
<template>
  <div>
    <div class="main">
      <yu-Gantt ref="gantt" :intervalHour="intervalTime" :baseDate="baseDate" :ganttData="ganttData" @getInfoCallback="getGanttInfo"></yu-Gantt>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseDate: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
      ganttData: [],
      intervalTime: [
        '6:00',
        '18:00'
      ]
    }
  },
  created () {
    this.ganttData = [
      {
        value: [
          {
            index: 1,
            roomName: '会议室2',
            startTime: `${this.baseDate} 08:28`,
            endTime: `${this.baseDate} 10:28`,
            status: 'in',
            content: 'API实现'
          }
        ]
      },
      {
        value: [
          {

            index: 2,
            roomName: '会议室4',
            startTime: `${this.baseDate} 12:28`,
            endTime: `${this.baseDate} 14:28`,
            status: 'out',
            content: '产品迭代'
          }
        ]
      },
      {
        value: [
          {
            index: 0,
            roomName: '会议室1',
            startTime: `${this.baseDate} 08:28`,
            endTime: `${this.baseDate} 09:28`,
            status: 'in',
            content: '商讨前端问题'
          }
        ]
      },
      {
        value: [
          {
            index: 3,
            roomName: '会议室3',
            startTime: `${this.baseDate} 08:28`,
            endTime: `${this.baseDate} 10:00`,
            status: 'in',
            content: 'xxx测试'
          }
        ]
      }
    ]
  },
  mounted () {

  },
  methods: {
    getGanttInfo () {

    }
  },
  computed: {

  }
}
</script>

<style scoped lang="less">

</style>
