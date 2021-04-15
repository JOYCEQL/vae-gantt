/*
 * @Author: yuguangzhou
 * @Date: 2021-04-13 16:58:02
 * @LastEditTime: 2021-04-13 16:58:19
 * @LastEditors: yuguangzhou
 * @Description:
 */
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
  }
}
