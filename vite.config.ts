import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    autoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
      dirs: [
        './src/shared/services/api',
        './src/components/01.kit/*',
      ],

      dts: './src/types/dts/auto-imports.d.ts',
    }),

    Components({
      dirs: ['src/components/01.kit'],
      deep: true,
      resolvers: [
        (componentName) => {
          const path = `src/components/01.kit/${componentName}/index.ts`
          if (componentName.startsWith('U')) {
            return { from: path }
          }
        },
      ],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/types/dts/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
