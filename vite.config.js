import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {   // 요청 URL의 경로를 지정,클라이언트에서 /api로 시작하는 요청이 들어오면 이 프록시 설정이 적용됨
        target: 'http://localhost:8087',  // 프록시가 요청을 전달할 실제 서버의 주소를 지정
        changeOrigin: true, // 요청 헤더의 Origin 값을 프록시 서버의 URL로 변경
        // rewrite: (path) => path.replace(/^\/api/, ''), // 프록시 경로와 실제 서버 경로가 다른 경우에 rewrite를 사용해 경로를 수정
        // 최초요청경로에서 /api를 빈문자열로변경 -> /api 문자열을 제거하고 나머지 부분만 경로로 덧붙여 요청
      },
      '/members': {
        target: 'http://localhost:8087',
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:8087',
        changeOrigin: true,
      },
      '/logout': {
        target: 'http://localhost:8087',
        changeOrigin: true,
      },
      '/member': {
        target: 'http://localhost:8087',
        changeOrigin: true,
      },
    },
  },
})
