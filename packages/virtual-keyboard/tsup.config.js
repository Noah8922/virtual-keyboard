const { defineConfig } = require("tsup");

module.exports = defineConfig({
  entry: ["src/index.ts"], // 진입점 파일 지정 (여러 개 가능)
  format: ["esm", "cjs"], // ESM과 CJS 둘 다 출력
  dts: true, // .d.ts 타입 파일 생성
  sourcemap: true, // 소스맵 생성 (디버깅용)
  clean: true, // 빌드 전 dist 폴더 정리
  outDir: "dist", // 출력 디렉토리
  target: "es2020", // 타겟 Node.js 버전
  skipNodeModules: true, // node_modules 번들링 생략 (트리셰이킹 지원)
  minify: process.env.NODE_ENV === "production", // 프로덕션에서 압축
});
