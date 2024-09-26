一些样式知识点的补充：

数据大屏：
vw、vh来实现




height: 100vh//vh是一个相对长度单位，代表视口高度的1%。vh的"v"代表视口（viewport），"h"代表高度（height）。当使用100vh作为元素的高度时，它将占据整个视口的高度。这通常用于创建响应式布局，使元素的高度能够适应不同设备的屏幕大小。例如，如果你有一个全屏的背景图片或者视频，你可以使用height: 100vh;来确保它填满整个屏幕的高度。

background-size属性用于设置元素背景图像的尺寸。cover是这个属性的一个值，它的作用是将背景图像扩展或缩小，以确保它完全覆盖元素的整个区域，同时保持图像的宽高比不变。
使用background-size: cover;时，背景图像会进行如下处理：
扩展：如果背景图像的原始尺寸小于元素的尺寸，图像会被扩展以覆盖整个元素区域。
缩小：如果背景图像的原始尺寸大于元素的尺寸，图像会被缩小以适应元素的尺寸。
保持比例：无论扩展还是缩小，图像的宽高比都会被保持，这意味着图像可能不会完全填满元素的宽度或高度，但会尽可能地覆盖元素的区域。

  Object.assign(attrParams.value,JSON.parse(JSON.stringify(row)))
  深拷贝和浅拷贝：JSON.parse(JSON.stringify(row))这个是将row这一个对象转换为一个新的对象，那么这样深拷贝之后操作对象不会影响到源对象，如果是浅拷贝，操作会直接操作原对象

服务器域名:http://sph-api.atguigu.cn

swagger文档:

http://139.198.104.58:8209/swagger-ui.html

http://139.198.104.58:8212/swagger-ui.html#/

echarts:国内镜像网站

https://www.isqqw.com/echarts-doc/zh/option.html#title

http://datav.aliyun.com/portal/school/atlas/area_selector


1、svg图标的配置
安装SVG依赖插件

    npm install vite-plugin-svg-icons -D

在vite.config.ts中配置插件

    import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
    import path from 'path'
    export default () => {
      return {
        plugins: [
          createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // Specify symbolId format
            symbolId: 'icon-[dir]-[name]',
          }),
        ],
      }
    }

入口文件导入

    import 'virtual:svg-icons-register'

由于svg图标会经常使用，因此封装成一个组件

使用svg图标：
<!-- svg图标为外层容器节点，内部需要与use标签结合使用 -->
<!-- 在svg标签里面可以设置宽高 -->
<!-- svg图标为外层容器节点，内部需要与use标签结合使用 -->
<!-- 在svg标签里面可以设置宽高 -->
<svg  style="width: 100px;height:100px">
<!-- xlink:herf来执行哪一个图标,属性值务必是#icon-图标名字-->
<!-- use标签fill属性可以设置标签的颜色 -->
<use xlink:href="#icon-test" fill="red"></use>
</svg>


而且封装成全局组件可以将由父亲通过props来从传递数据控制组件的显示与颜色等

2、二次封装requests （在utils下面的reque函数）

3、mock数据，下载mock插件vite-plugin-mock（详情配置查看官网）（mock数据的接口在mock文件夹）

4、封装user的接口以及对user路由请求的数据、路由请求成功返回的数据进行类型限制
封装路由请求函数（使用二次封装函数request）：
对参数进行类型的限制（在api下面的user文件夹）

5、路由的配置（npm下载vue-router）

6、采用pinia来存储数据

7、对登录页面进行路由请求处理

8、登录页面进行表单校验

9、动态生成路由

10、<component :is="item.meta.icon"></component>动态组件的语法
:is 属性是一个动态绑定，它允许你将组件的名称或者类型动态地设置为不同的值。

11、菜单的折叠

12、路由的面包屑

13、点击页面刷新
watch(()=>LayStore.reflsh,()=>{
  flag.value=false
  //下一个DOM更新循环之后将flag的值设置回true
  nextTick(()=>{
    flag.value=true
  })
})

14、点击页面全屏（对dom进行操作）

15、退出登录（发路由请求，将token清除本地存储清除）

16、路由鉴权（vue-router）

17、连接真实接口（代理跨域问题去vite官网）
server:{
                proxy:{
                  //这里放在【】里面是表示变量，没有放在【】里面表示的是字符串，vite不会解析
                  [env.VITE_APP_BASE_API]:{
                    // 获取数据的服务器地址设置
                    target: env.VITE_SERVE,
                    // 是否需要代理跨域
                    changeOrigin: true,
                    // 路径重写，将/api换成是''空
                    rewrite: (path) => path.replace(/^\/api/, ''),
                  }
                }
              }


v-select里面的v-optopn
收集数据：v-option的属性:value来收集需要的数据
v-select里面的属性v-model="xxxx"，这个xxxx才是真正收集数据的地方