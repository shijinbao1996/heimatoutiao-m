module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      //设计稿1rem的大小
      // vant组件库是根据37.5

      // 动态设置 rootValue
      // rootValue 属性会遍历文件 若找到属于 vant 的文件则设置 rem为37.5
      rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 75),
      //适配的属性
      propList: ['*'] //['height', 'padding']
    }
  }
}
