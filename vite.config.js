import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

function copyVideoFiles() {
  return {
    name: 'copy-video-files',
    generateBundle() {
      const videoDirectory = path.resolve('video')

      for (const fileName of fs.readdirSync(videoDirectory)) {
        const filePath = path.join(videoDirectory, fileName)

        if (fs.statSync(filePath).isFile()) {
          this.emitFile({
            type: 'asset',
            fileName: `video/${fileName}`,
            source: fs.readFileSync(filePath)
          })
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [copyVideoFiles()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
