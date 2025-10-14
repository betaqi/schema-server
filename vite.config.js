import { basename, dirname, join, resolve } from 'path'
import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { createHtmlPlugin } from 'vite-plugin-html'
import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'

// 自动扫描所有 entry.main.jsx 入口
const entryFiles = glob.sync(join(__dirname, 'app/pages/views/**/entry.main.jsx'))
const input = {}
entryFiles.forEach(file => {
  //! 通过文件夹名称作为入口名称
  const entryName = basename(dirname(file))
  input[entryName] = resolve(file)
})

export default defineConfig((mode) => {
  const isDev = mode === 'development'
  return {
    plugins: [
      react(),
      // tailwindcss(),
      createHtmlPlugin({
        minify: !isDev,
        pages: Object.keys(input).map(name => {
          return {
            entry: input[name],
            filename: `${ name }.html`,
            template: resolve(__dirname, 'app/view-template/entry.html'), // HTML 模板
            injectOptions: {
              data: {
                title: name, // 可以传入变量给模板
                env: mode,
              },
            }
          }
        }),
      })],
    base: '/', // 开发环境资源路径
    server: {
      port: 9002,
      host: '127.0.0.1',
    },
    css: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    build: {
      outDir: resolve(__dirname, `app/public/dist/${ isDev ? 'dev' : 'prod' }`), // dev 或 prod
      rollupOptions: {
        input
      }
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, 'app/pages'),
        '@': resolve(__dirname, 'app/pages'),
      },
    }
  }
})
