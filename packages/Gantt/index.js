/*
 * @Author: yuguangzhou
 * @Date: 2021-04-13 17:02:23
 * @LastEditTime: 2021-04-14 09:47:41
 * @LastEditors: yuguangzhou
 * @Description:
 */
// 导入组件，组件必须声明 name
import YGantt from './src'
// 为组件提供 install 安装方法，供按需引入
YGantt.install = function (Vue) {
  Vue.component(YGantt.name, YGantt)
}
// 导出组件
export default YGantt
