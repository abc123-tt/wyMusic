import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 解析svg文件的插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
// 查出基于本地当前文件的地址
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 写所有插件的配置
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 为了在项目中只需要写上svg文件名的前缀就能自动查找到该文件
      // process.cwd() 当前目录
      iconDirs:[resolve(process.cwd(),'src/assets/svgs')],
      // 解析当前使用的svg标签名的规则
      // icon是前缀，name是文件名的前缀，例如：ca
      symbolId:'icon-[name]'
    })
  ],
},
) 




