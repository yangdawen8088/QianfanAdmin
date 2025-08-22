import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
const viteConfig = defineConfig((mode) => {
  // const env = loadEnv(mode.mode, process.cwd())
  return {
    plugins: [
      vue({
        template: {}
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/Assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
        /**
         * custom insert position
         * @default: body-last
         */
        inject: 'body-last' | 'body-first',
        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        customDomId: '__svg__icons__dom__',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        deep: true,
        dirs: ['src/Components'],
        resolvers: [
          //特别注意importStyle不要搞错啦
          ElementPlusResolver({ importStyle: "sass" })
        ],
      }),
      // 按需定制主题配置
      ElementPlus({
        useSource: true,
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, './src/')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/Styles/elementUI.scss" as *;`,
        },
      },
    },
    server: {
      port: 8082,
      proxy: {
        '/api': {
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    define: {
      __SYSTEM_NAME__: JSON.stringify(process.env.npm_package_name)
    }
  };
});
export default viteConfig;
