import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//引入svg的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'


//mock接口导入
import { UserConfigExport, ConfigEnv,loadEnv  } from 'vite'

import { viteMockServe} from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'




// https://vitejs.dev/config/
export default defineConfig(({ command,mode})=> {
  //这里可以获取到各个环境下的对应的变量,mode是获取什么环境，process.cwd()是找到文件路径
  let env=loadEnv(mode,process.cwd())
  return {
  
  plugins: [
          vue(),

          viteMockServe({
                // default
                mockPath: 'mock',
                enable: true,
              }),

          createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
              }),
           ],

           // scss全局变量的配置
            css: {
                preprocessorOptions: {
                  scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/style/variable.scss";',
                  },
                },
            },

              //代理跨域
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

  }
})